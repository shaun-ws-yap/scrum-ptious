import { useState, useEffect } from 'react';
import filterTasksByUser from '../helpers/filterTasksByUser';
import { Prev } from 'react-bootstrap/esm/PageItem';

export default function useApplicationData(socket, loginToken, setError) {
  const [state, setState] = useState({
    userInfo: {},
    role: 0,
    userTasks: [],
    teamUsers: [],
    teamTasks: [],
    deadlines: [],
    submissions: [],
  });
  
  const setTasks = teamTasks => {
    const userTasks = filterTasksByUser(loginToken, teamTasks);
    setState(prev => ({...prev, teamTasks, userTasks}));
  }
  const setSubmissions = submissions => setState(prev => {
    return {...prev, submissions }
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
        role: userInfo.role, 
      }));
    });

    socket.on('error', (error, data) => {
      console.log('error received: ', error, data.title);
      setError(prev => ({...prev, title: data.title, message: error}));
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
    setTasks,  
    setSubmissions,
  }
}