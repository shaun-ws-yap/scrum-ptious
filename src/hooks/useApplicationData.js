import { useState, useEffect } from 'react';
import filterTasksByUser from '../helpers/filterTasksByUser';
import { Prev } from 'react-bootstrap/esm/PageItem';

export default function useApplicationData(socket, loginToken, setError) {
  const [state, setState] = useState({
    menu: "Dashboard",
    userInfo: {},
    role: 0,
    userTasks: [],
    teamUsers: [],
    teamTasks: [],
    allTasks: [],
    deadlines: [],
    submissions: [],
  });

  const setMenu = menu => setState(prev => ({...prev, menu}));
  
  const setTasks = teamTasks => {
    const userTasks = filterTasksByUser(loginToken, teamTasks);
    setState(prev => ({...prev, teamTasks, userTasks}));
  }
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
      setError(error);
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
    taskSetters: {
      setTasks,  
      setSubmissions,
    }
  }
}