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
import Login from './Login';

import useApplicationData from '../hooks/useApplicationData';
import { taskStatus } from '../helpers/taskStatus';

import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {

  const { 
    state,
    setMenu,
    setUser,
    setTaskItem
  } = useApplicationData();

  return (
    <div className="container">
      { state.user !== 0 && (
        <>
          <section className="sidebar">
            <img 
              className="sidebar-centered"
              src="https://logoipsum.com/logo/logo-25.svg"
            />
            <nav className="sidebar__menu">
              <Sidebar
                menu={state.menu}
                setMenu={setMenu}
                userInfo={state.userInfo}
              />
            </nav>
          </section>
        </>
      )}
      
      <section className="main">
        
        { state.user === 0 && <Login setUser={setUser} user={state.user} /> }
        { state.user !== 0 && <Dashboard menu={state.menu} tasks={state.tasks} setTaskItem={setTaskItem} taskItem={state.taskItem} role={state.role} /> }

      </section>
      
      <section className="user__info">
        { state.user !== 0 && <UserInfo userInfo={state.userInfo} deadlines={state.tasks} /> }
      </section>
    </div>
  );
}

export default App