import { useState, useEffect } from 'react';
import filterTasksByUser from '../helpers/filterTasksByUser';
// import { Prev } from 'react-bootstrap/esm/PageItem';


export default function useApplicationData(socket, loginToken, setError) {
  const [state, setState] = useState({
    userInfo: {},
    role: 0,
    userTasks: [],
    teamUsers: [],
    teamTasks: [],
    submissions: [],
    messages: [],
  });
  
  const logout = () => setState({
    userInfo: {},
    role: 0,
    userTasks: [],
    teamUsers: [],
    teamTasks: [],
    submissions: [],
    messages: [],
  });
  
  const setTasks = teamTasks => {
    const userTasks = filterTasksByUser(loginToken, teamTasks);
    setState(prev => ({...prev, teamTasks, userTasks}));
  }
  const setSubmissions = submissions => setState(prev => {
    return {...prev, submissions }
  })

  const setMessages = (messages, shouldAppend) => setState(prev => {
    if (shouldAppend) {
      return {...prev, messages: [...prev.messages, ...messages]};
    }
    return {...prev, messages: [...messages, ...prev.messages]};
  })

  useEffect(() => {
    if (!loginToken) {
      return;
    }

    if (!socket) {
      return;
    }

    socket.emit('user logged in', loginToken);

    socket.on('login data', loginData => {
      const { userTasks, userInfo, teamTasks, teamUsers, submissions } = loginData;
      setState(prev => ({ 
        ...prev, 
        userTasks, 
        userInfo, 
        teamTasks, 
        teamUsers, 
        submissions, 
        role: userInfo.role, 
      }));
    });

    socket.on('error', (error, data) => {
      setError(prev => ({...prev, title: data.title, message: error}));
    });

    return () => {
      if (!loginToken) {
        socket.off('login data'); 
        socket.off('error');
      }
    }
  }, [socket]);


  return { 
    state, 
    logout,
    setTasks,  
    setSubmissions,
    setMessages,
  }
}