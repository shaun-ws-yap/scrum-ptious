import { useState, useEffect } from 'react';
import axios from 'axios';
import { Prev } from 'react-bootstrap/esm/PageItem';

export default function useApplicationData(socket, loginToken, setError) {
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
    team: 0, // not used
  });

  const setMenu = menu => setState({...state, menu});
  const setTaskItem = taskItem => setState({...state, taskItem});
  const setTeamTasks = teamTasks => setState(prev => ({...prev, teamTasks}));
  const setUserTasks = userTasks => setState(prev => ({...prev, userTasks}));
  
  // not being used
  // const setUser = userId => setState({...state, userId});
  // const setAllTasks = allTasks => setState({...state, allTasks});

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
      setError(error);
    });

    return () => {
      if (!loginToken) {
        socket.off('login data');
        socket.off('error');
      }
    }
  }, [loginToken]);

  // function createTaskItem(taskItem) {
  //   let task = {...taskItem, projecttask_id: state.userInfo.team_id }

  //   return axios.put(`http://localhost:8080/api/tasks`, task)
  //   .then(res => {
  //     const newTasks = [ ...state.teamTasks, res.data ];
  //     setTeamTasks(newTasks);
  //   })
  //   .catch(e => console.log(e));
  // }

  function editTaskItem(taskItem) {
    return axios.put(`http://localhost:8080/api/tasks/${taskItem.id}`, taskItem)
    .then(res => {
      const taskItemIndex = state.allTasks.findIndex(x => x.id === taskItem.id);
      setState(prev => ({
        ...prev,
        teamTasks: [
          ...state.teamTasks.slice(0, taskItemIndex),
          Object.assign({}, state.teamTasks[taskItemIndex], taskItem),
          ...state.teamTasks.slice(taskItemIndex + 1)
        ],
        allTasks: [
          ...state.allTasks.slice(0, taskItemIndex),
          Object.assign({}, state.allTasks[taskItemIndex], taskItem),
          ...state.allTasks.slice(taskItemIndex + 1)
        ]
      }))
    })
    .catch(e => console.log(e));
  }

  function deleteTaskItem(id) {
    return axios.delete(`http://localhost:8080/api/tasks/${id}`)
    .then((res) => {
      const tmp = state.allTasks.filter(task => task.id !== id);
      setState(prev => ({...prev, teamTasks: tmp, allTasks: tmp}));
    })
    .catch(e => console.log(e));
  }

  return { 
    state, 
    setMenu, 
    setTaskItem, 
    setUserTasks, 
    setTeamTasks, 
    // createTaskItem, 
    // editTaskItem, 
    // deleteTaskItem, 
    
    // not being used
    // setUser, 
    // setAllTasks, 
  }
}