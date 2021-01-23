import { useState, useEffect } from 'react';
import { Prev } from 'react-bootstrap/esm/PageItem';

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
    team: 0, // not used
  });

  const setMenu = menu => setState({...state, menu});
  const setTaskItem = taskItem => setState({...state, taskItem});
  const setTeamTasks = teamTasks => setState(prev => ({...prev, teamTasks}));
  const setUserTasks = userTasks => setState(prev => ({...prev, userTasks}));

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

  return { 
    state, 
    setMenu, 
    setTaskItem, 
    setUserTasks, 
    setTeamTasks, 
  }
}