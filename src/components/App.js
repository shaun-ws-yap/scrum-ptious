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
import "react-datepicker/dist/react-datepicker.css";

function App() {

  const { 
    state,
    setMenu,
    setUser,
    setTaskItem,
    setTasks,
    setTeamTasks,
    setAllTasks,
    createTaskItem,
    deleteTaskItem
  } = useApplicationData();

  console.log(state);

  return (
    <div className="container">
      { state.user !== 0 && (
        <>
          <section className="sidebar">
            <img 
              alt="Scrum-ptious Logo"
              className="sidebar-centered"
              src="https://logoipsum.com/logo/logo-25.svg"
            />
            <nav className="sidebar__menu">
              <Sidebar
                menu={state.menu}
                setMenu={setMenu}
                userInfo={state.userInfo}
                teamUsers={state.teamUsers}
                createTaskItem={createTaskItem.bind(this)}
              />
            </nav>
            <button onClick={() => setUser(0)}>
              Log out
            </button>
          </section>
        </>
        
      )}
      <section className="main">
        
        { state.user === 0 && <Login setUser={setUser} user={state.user} /> }
        { state.user !== 0 && <Dashboard user={state.user} userInfo={state.userInfo} menu={state.menu} tasks={state.tasks} setTasks={setTasks} setTaskItem={setTaskItem} taskItem={state.taskItem} role={state.role} teamTasks={state.teamTasks} teamUsers={state.teamUsers} setTeamTasks={setTeamTasks.bind(this)} setAllTasks={setAllTasks.bind(this)} allTasks={state.allTasks} createTaskItem={createTaskItem.bind(this)} deleteTaskItem={deleteTaskItem} /> }

      </section>
      
      <section className="user__info">
        { state.user !== 0 && <UserInfo userInfo={state.userInfo} deadlines={state.deadlines} /> }
      </section>
    </div>
  );
}

export default App