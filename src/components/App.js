import '../styles/App.css';
import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';

import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Chat from './Chat';
import Sidebar from './Sidebar';
import UserInfo from './Dashboard/UserInfo';
import TaskResource from './Dashboard/TaskResource';

import 'react-pro-sidebar/dist/css/styles.css';

function App() {

  const [state, setState] = useState({
    menu: "Dashboard",
    tasks: []
  });

  useEffect(() => {
    const tasksURL = `http://localhost:8080/api/tasks`
    axios.get(tasksURL)
    .then((data) => {
      // console.log(data);
      setState(prev => ({...prev, tasks: data}));
    })
  }, [])

  return (
    <div className="container">
      <section className="sidebar">
        <img 
          className="sidebar-centered"
          src="https://logoipsum.com/logo/logo-25.svg"
        />
        <nav className="sidebar__menu">
          <Sidebar
            menu={state.menu}
            setMenu={setState}
          />
        </nav>
      </section>

      <section className="main">
        <Dashboard 
          menu={state.menu}
          tasks={state.tasks}
        />
      </section>
      
      <section className="user__info">
        <UserInfo />
      </section>
    </div>
  );
}

export default App