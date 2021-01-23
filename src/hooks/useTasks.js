import { useState, useEffect } from 'react';
import filterTasksByUser from '../helpers/filterTasksByUser';

export default function useTasks(loginToken, teamId, socket, setTeamTasks, setUserTasks ) {
  useEffect(() => {
    if (!loginToken) {
      return;
    }

    socket.on('tasks update', (teamTasks) => {
      setTeamTasks(teamTasks);
      //filter out your tasks
      const userTasks = filterTasksByUser(loginToken, teamTasks);
      setUserTasks(userTasks);
    });

    socket.on('tasks action saved', (msg) => {
      console.log(msg);
    });

    return () => {
      socket.off('tasks update');
      socket.off('tasks action saved');
    }
  }, [loginToken]);


  const createTaskItem = taskItem => {
    let task = {...taskItem, projecttask_id: teamId }
    socket.emit('tasks add', task);
  };

  const editTaskItem = taskItem => {
    socket.emit('tasks edit', taskItem);
  };

  const deleteTaskItem = id => {
    socket.emit('tasks delete', id);
  };

  return {
    createTaskItem,
    editTaskItem,
    deleteTaskItem,
  };
}