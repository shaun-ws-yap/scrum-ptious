import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData(props) {
  const [state, setState] = useState({
    user: 0,
    menu: "Dashboard",
    tasks: [],
    userInfo: {},
    taskItem: [],
    role: 0,
    team: 0,
    teamTasks: [],
    teamMembers: [],
  })
  
  const GET_ALL_TASKS = `http://localhost:8080/api/tasks/`;
  const GET_USER_INFO = `http://localhost:8080/api/employees/${state.user}`;
  const GET_USERS_BY_TEAM = `http://localhost:8080/api/employees/team/${state.team}`;
  const GET_TASKS = `http://localhost:8080/api/tasks/user/${state.user}`;
  const GET_TEAM_TASKS = `http://localhost:8080/api/tasks/team/${state.team}`;

  const setMenu = menu => setState({...state, menu});
  const setUser = user => setState({...state, user});
  const setTaskItem = taskItem => setState({...state, taskItem});

  // setState(prev => ({ ...prev, tasks: all[0].data, userInfo: all[1].data[0], role: all[1].data[0]['role'], team: all[1].data[0]['team_id'], teamTasks: all[2].data }))

  useEffect(() => {

    Promise.all([
      axios.get(GET_TASKS),
      axios.get(GET_USER_INFO),
      axios.get(GET_TEAM_TASKS),
      axios.get(GET_USERS_BY_TEAM),
    ]).then(all => {
      if (state.user !== 0) {
        console.log(all[0].data[state.user]);
        setState(prev => ({ ...prev, tasks: all[0].data, userInfo: all[1].data[0], role: all[1].data[0]['role'], team: all[1].data[0]['team_id'], teamTasks: all[2].data, teamMembers: all[3].data }))
      }
    })
    .catch(e => console.log(e));
  }, [state.user, state.team])

  console.log(state.allTasks);

  function createTaskItem(taskItem) {

    const task = {...taskItem, projecttask_id: state.team }

    return axios.put(`http://localhost:8080/api/tasks`, task)
    .then(res => {
      console.log("successfully added", task)
    })
    .catch(e => console.log(e));
    // const task = {
    //   ...state.teamTasks[id],

    //   description,
    // }

    // const tasks = {
    //   ...state.tasks,
    //   [id]: task
    // }

    // console.log(task.title);
    
    // return axios.put(`http://localhost:8080/api/tasks/${id}`, task)
    // .then(() => {
    //   console.log('successful');
    //   // call tasks
    //   // setState({
    //   //   ...state,
    //   //   tasks
    //   // });
    // })
    // .catch((e) => console.log(e));
  }

  return { state, setMenu, setUser, setTaskItem, createTaskItem }

}