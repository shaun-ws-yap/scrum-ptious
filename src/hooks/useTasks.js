import { useState, useEffect } from 'react';
import findSubmissionByTask from '../helpers/findSubmissionByTask';

export default function useTasks(loginToken, socket, submissions, setTasks, setSubmissions, setUserNotification, setManagerNotification) {
  const TASK_STATUS = {
    ASSIGNED: 0,
    IN_PROGRESS: 1,
    IN_REVIEW: 2,
    COMPLETE: 3,
  }

  useEffect(() => {
    if (!loginToken) {
      return;
    }

    socket.on('tasks update', (teamTasks, userToAlert) => {
      setTasks(teamTasks);
      setUserNotification(prev => ({...prev, message: "Your tasks have updated", user: userToAlert, title: "Click to view", type: "warning"}))
    });
    
    socket.on('tasks action saved', (op, task) => {
      console.log(op)
      switch(op) {
        case 'CREATE':
          setManagerNotification(prev => ({...prev, message: task.title, title: "Task Created", type: "success", user: Number(loginToken) }))
          break;
        case 'EDIT':
          setManagerNotification(prev => ({...prev, message: task.title, title: "Task Updated", type: "success", user: Number(loginToken) }))
          break;
        case 'DELETE':
          setManagerNotification(prev => ({...prev, message: task.title, title: "Task Deleted", type: "success", user: Number(loginToken) }))
          break;
      }
    });

    socket.on('submt/feedback', (result, userToAlert) => {
      setUserNotification(prev => ({...prev, message: "You have new feedback", user: userToAlert, title: "Click to view", type: "info"}))
      setTasks(result.teamTasks);
      setSubmissions(result.submissions);
    });
      
    return () => {
      socket.off('tasks update');
      socket.off('tasks action saved');
      socket.off('submit/feedback');
    }
  }, [loginToken]);

  const CREATE = 'CREATE';
  const EDIT   = 'EDIT';
  const DELETE = 'DELETE';

  const moveTask = (taskItem, STATUS) => {
    socket.emit('move task', taskItem, STATUS);
  }

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
    socket.emit('employee submit', submitTaskData, 1);
  };

  const giveFeedback = (message, task, accepted) => {
    const ACCEPTED = 'accepted';
    const REJECTED = 'rejected';

    const submission = findSubmissionByTask(submissions, task.id);
    const feedback = {
      ...submission,
      feedback_string: message,
      status: accepted ? ACCEPTED : REJECTED
    }
    const taskItem = {
      ...task,
      status: accepted ? 3 : 1
    }

    socket.emit('feedback', {feedback, taskItem}, taskItem.employee_id);
  }

  return {
    moveTask,
    createTaskItem,
    editTaskItem,
    deleteTaskItem,
    submitTaskItem,
    giveFeedback,
  };
}
