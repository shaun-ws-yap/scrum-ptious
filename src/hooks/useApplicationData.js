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
    submissions: [],
  });

  const setMenu = menu => setState(prev => ({...prev, menu}));
  const setTaskItem = taskItem => setState(prev => ({...prev, taskItem}));
  const setTeamTasks = teamTasks => setState(prev => ({...prev, teamTasks}));
  const setUserTasks = userTasks => setState(prev => ({...prev, userTasks}));
  const setSubmissions = submission => setState(prev => {
    return {
      ...prev,
      submissions: [...prev.submissions, submission]
    }
  })

  useEffect(() => {
    if (!loginToken) {
      return;
    }

    socket.emit('user logged in', loginToken);

    socket.on('login data', loginData => {
      const { userTasks, userInfo, teamTasks, teamUsers, deadlines, submissions } = loginData;
      setState(prev => ({ 
        ...prev, 
        userTasks, 
        userInfo, 
        teamTasks, 
        teamUsers, 
        deadlines,
        submissions, 
        allTasks: teamTasks, 
        role: userInfo.role, 
      }));
    });

    socket.on('error', (error, data) => {
      console.log('error received: ', error, data);
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
    taskSetters: {
      setUserTasks, 
      setTeamTasks, 
      setSubmissions,
    }
  }
}