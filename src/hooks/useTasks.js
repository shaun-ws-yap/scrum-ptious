import { useState, useEffect } from 'react';
import axios from "axios";

export default function useTasks(socket, setTeamTasks, setUserTasks ) {
  useEffect(() => {
    socket.on('user tasks update', (userTasks) => {
      setUserTasks(userTasks);
    });

    socket.on('team tasks update', (teamTasks) => {
      setTeamTasks(teamTasks);
    })
  }, []);

  // function createTaskItem(taskItem, ) {
  //   let task = {...taskItem, projecttask_id: state.team }

  //   return axios.put(`http://localhost:8080/api/tasks`, task)
  //   .then(res => {
  //     const id = res.data.id;
  //     task = {...task, id: id};
  //     const tmp = [...state.allTasks];
  //     tmp.push(task);
  //     setState(prev => ({...prev, teamTasks: tmp, allTasks: tmp}))
  //   })
  //   .catch(e => console.log(e));
  // }

  // function editTaskItem(id, taskItem) {
  //   console.log(id)
  //   console.log(taskItem);
  // }

  // function deleteTaskItem(id) {
  //   return axios.delete(`http://localhost:8080/api/tasks/${id}`)
  //   .then((res) => {
  //     const tmp = [...state.allTasks]
  //     setState(prev => ({...prev, teamTasks: tmp, allTasks: tmp}))
  //   })
  //   .catch(e => console.log(e));
  // }
}