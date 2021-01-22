import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData(socket, loginToken) {
  const [state, setState] = useState({
    menu: "Dashboard",
    userInfo: {},
    role: 0,
    userTasks: [],
    taskItem: [],
    teamUsers: [],
    teamTasks: [],
    allTasks: [],
    deadlines: [],
    userId: 0, // not used
    team: 0, // not used
  });

  //const [tasks, setTasks] = useState([]);

  const setMenu = menu => setState({...state, menu});
  const setTaskItem = taskItem => setState({...state, taskItem});
  
  // not being used
  const setUser = userId => setState({...state, userId});
  const setUserTasks = userTasks => setState({...state, userTasks});
  const setTeamTasks = teamTasks => setState({...state, teamTasks});
  const setAllTasks = allTasks => setState({...state, allTasks});

  useEffect(() => {
    if (!loginToken) {
      return;
    }

    socket.emit('user logged in', loginToken);

    socket.on('login data', loginData => {
      const { userTasks, userInfo, teamTasks, teamUsers, deadlines } = loginData;
      setState(prev => ({ 
        ...prev, 
        userTasks, 
        userInfo, 
        teamTasks, 
        deadlines, 
        teamUsers, 
        allTasks: teamTasks, 
        role: userInfo.role, 
        team: userInfo.team_id, 
      }));
    });

    socket.on('error', function(error) {
      console.log('error received: ', error);
    });

    return () => {
      if (!loginToken) {
        socket.off('login data');
        socket.off('error');
      }
    }
  }, [loginToken]);

  function createTaskItem(taskItem) {
    let task = {...taskItem, projecttask_id: state.userInfo.team_id }

    return axios.put(`http://localhost:8080/api/tasks`, task)
    .then(res => {
      console.log(res.data)
      // const id = res.data.id;
      // task = {...task, id: id};
      // const tmp = [...state.allTasks];
      // tmp.push(task);
      const newTasks = [ ...state.teamTasks, res.data ];
      setTeamTasks(newTasks);
    })
    .catch(e => console.log(e));
  }

  function editTaskItem(id, taskItem) {
    console.log(id)
    console.log(taskItem);
  }

  function deleteTaskItem(id) {
    return axios.delete(`http://localhost:8080/api/tasks/${id}`)
    .then((res) => {
      const tmp = [...state.allTasks]
      setState(prev => ({...prev, teamTasks: tmp, allTasks: tmp}))
    })
    .catch(e => console.log(e));
  }

  return { 
    state, 
    setMenu, 
    setUser, 
    setTaskItem, 
    createTaskItem, 
    editTaskItem, 
    deleteTaskItem, 
    
    // not being used
    setUserTasks, 
    setTeamTasks, 
    setAllTasks, 
  }
}