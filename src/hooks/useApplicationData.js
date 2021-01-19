import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData(props) {
  const [state, setState] = useState({
    user: 0,
    menu: "Dashboard",
    tasks: [],
    userInfo: {}
  })
  
  const GET_TASKS = `http://localhost:8080/api/tasks/user/${state.user}`;
  const GET_USER_INFO = `http://localhost:8080/api/employees/${state.user}`;

  const setMenu = menu => setState({...state, menu});
  const setUser = user => setState({...state, user});
  
  useEffect(() => {
    Promise.all([
      axios.get(GET_TASKS),
      axios.get(GET_USER_INFO),
    ]).then(all => {
      setState(prev => ({ ...prev, tasks: all[0].data, userInfo: all[1].data[0] }))
    })
    
  }, [state.user])
  return { state, setMenu, setUser }

}