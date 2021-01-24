import { useState, useEffect } from 'react';
import filterTasksByUser from '../helpers/filterTasksByUser';

export default function useTasks(loginToken, socket, taskSetters, setNotification ) {
  const TASK_STATUS = {
    ASSIGNED: 0,
    IN_PROGRESS: 1,
    IN_REVIEW: 2,
    COMPLETE: 3,
  }

  const { setTeamTasks, setUserTasks, setSubmissions } = taskSetters;

  useEffect(() => {
    if (!loginToken) {
      return;
    }

    socket.on('tasks update', (teamTasks, userToAlert) => {
      setTeamTasks(teamTasks);
      //filter out your tasks
      const userTasks = filterTasksByUser(loginToken, teamTasks);
      setNotification(userToAlert)
      setUserTasks(userTasks);
    });
    
    socket.on('tasks action saved', (op, task) => {
      console.log(op, task);
    });

    socket.on('employee submit', result => {
      console.log(result);
      setTeamTasks(result.teamTasks);
      setSubmissions(result.submission);
      // TODO: also need to set teamTasks here
      //setSubmissions(result.submission);
    });
      
    return () => {
      socket.off('tasks update');
      socket.off('tasks action saved');
      socket.off('employee submit');
    }
  }, [loginToken]);

  const CREATE = 'CREATE';
  const EDIT   = 'EDIT';
  const DELETE = 'DELETE';

  const createTaskItem = taskItem => {
    socket.emit('tasks update', taskItem, CREATE);
  };

  const editTaskItem = taskItem => {
    socket.emit('tasks update', taskItem, EDIT);
  };

  const deleteTaskItem = taskItem => {
    socket.emit('tasks update', taskItem, DELETE);
  };

  const submitTaskItem = taskItem => {
    const toSubmit = {...taskItem, status: TASK_STATUS.IN_REVIEW}
    const submitTaskData = {
      submission: {
        feedback_string: '', 
        submission_date: new Date().toISOString(), 
        task_id: taskItem.id
      },
      taskItem: toSubmit
    }
    socket.emit('employee submit', submitTaskData);
  }

  return {
    createTaskItem,
    editTaskItem,
    deleteTaskItem,
    submitTaskItem,
  };
}