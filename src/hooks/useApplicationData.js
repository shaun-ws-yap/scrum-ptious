import { useState, useEffect } from 'react';
import axios from 'axios';

export default function useApplicationData(props) {
  const [state, setState] = useState({
    user: 0,
    menu: "Dashboard",
    tasks: [],
  })
  
  const GET_TASKS = `http://localhost:8080/api/tasks/${state.user}`;

  const setMenu = menu => setState({...state, menu});
  const setUser = user => setState({...state, user});
  
  useEffect(() => {
    Promise.all([
      axios.get(GET_TASKS),
    ]).then(all => {
      setState(prev => ({...prev, tasks: all[0].data}))
    })
    
  }, [])
  return { state, setMenu, setUser }

}