import { useState, useEffect } from 'react';
import findSubmissionByTask from '../helpers/findSubmissionByTask';

export default function useTasks(loginToken, socket, submissions, setTasks, setSubmissions, setNotification ) {
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
      setNotification(userToAlert)
    });
    
    socket.on('tasks action saved', (op, task) => {
      console.log(op, task);
    });

    socket.on('submt/feedback', result => {
      console.log(result);
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
    socket.emit('employee submit', submitTaskData);
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

    socket.emit('feedback', {feedback, taskItem});
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
