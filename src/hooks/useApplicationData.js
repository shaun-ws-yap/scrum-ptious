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
    teamUsers: [],
    allTasks: []
  })
  
  const GET_ALL_TASKS = `http://localhost:8080/api/tasks/`;
  const GET_USER_INFO = `http://localhost:8080/api/employees/${state.user}`;
  const GET_TASKS = `http://localhost:8080/api/tasks/user/${state.user}`;
  const GET_TEAM_TASKS = `http://localhost:8080/api/tasks/team/${state.team}`;
  const GET_TEAM_USERS = `http://localhost:8080/api/employees/team/${state.team}`;

  const setMenu = menu => setState({...state, menu});
  const setUser = user => setState({...state, user});
  const setTaskItem = taskItem => setState({...state, taskItem});
  const setTasks = tasks => setState({...state, tasks});
  const setTeamTasks = teamTasks => setState({...state, teamTasks});
  const setAllTasks = allTasks => setState({...state, allTasks});
  
  useEffect(() => {

    Promise.all([
      axios.get(GET_TASKS),
      axios.get(GET_USER_INFO),
      axios.get(GET_TEAM_TASKS),
      axios.get(GET_TEAM_USERS)
    ]).then(all => {
      if (state.user !== 0) {
      setState(prev => ({ ...prev, tasks: all[0].data, userInfo: all[1].data[0], role: all[1].data[0]['role'], team: all[1].data[0]['team_id'], teamTasks: all[2].data, teamUsers: all[3].data, allTasks: all[2].data }))
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

  return { state, setMenu, setUser, setTaskItem, setTasks, setTeamTasks, setAllTasks, createTaskItem  }

}