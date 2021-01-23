import { useState, useEffect } from 'react';
import filterTasksByUser from '../helpers/filterTasksByUser';

export default function useTasks(loginToken, teamId, socket, setTeamTasks, setUserTasks, setNotification ) {
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

    return () => {
      socket.off('tasks update');
      socket.off('tasks action saved');
    }
  }, [loginToken]);

  const CREATE = 'CREATE';
  const EDIT   = 'EDIT';
  const DELETE = 'DELETE';

  const createTaskItem = taskItem => {
    let task = {...taskItem, projecttask_id: teamId }
    socket.emit('tasks update', task, CREATE);
  };

  const editTaskItem = taskItem => {
    socket.emit('tasks update', taskItem, EDIT);
  };

  const deleteTaskItem = taskItem => {
    socket.emit('tasks update', taskItem, DELETE);
  };

  return {
    createTaskItem,
    editTaskItem,
    deleteTaskItem,
  };
}