import { useState, useEffect } from 'react';

export default function useTasks(socket, setTeamTasks, setUserTasks ) {
  useEffect(() => {
    socket.on('tasks update', (userTasks) => {
      console.log('task updated');
      //setUserTasks(userTasks);
    });

    socket.on('action saved', (msg) => {
      console.log(msg);
    });

    return () => {
      socket.off('tasks update');
      socket.off('tasks action saved');
    }
  }, []);

  const createTaskItem = taskItem => {
    socket.emit('tasks add', taskItem);
  };

  const editTaskItem = (id, taskItem) => {
    socket.emit('tasks edit', id, taskItem);
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