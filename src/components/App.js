import '../styles/App.css';
import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import axios from 'axios';

import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Chat from './Chat';
import PerformanceReview from './Performance-Review/PerformanceReview';
import Sidebar from './Sidebar';
import UserInfo from './Dashboard/UserInfo';
import Login from './Login';

import useApplicationData from '../hooks/useApplicationData';
import useSocket from '../hooks/useSocket';
import { taskStatus } from '../helpers/taskStatus';

import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";

const DASHBOARD = "Dashboard";
const TASKS = "Tasks";
const CHAT = "Chat";
const PERFORMANCE_REVIEW = "Performance Review"

function App() {
  const [loginToken, setLoginToken] = useState(0);
  const { socket } = useSocket();

  const { 
    state,
    setMenu,
    setTaskItem,
    createTaskItem,
    editTaskItem,
    deleteTaskItem
  } = useApplicationData(socket, loginToken);

  const {
    menu,
    userTasks,
    userInfo,
    taskItem,
    role,
    teamTasks,
    teamUsers,
    allTasks,
    deadlines
  } = state;

  if ( loginToken === 0 ) {
    return (
      <section className="main">
        { loginToken === 0 && <Login setLogin={setLoginToken}/> }
      </section>
    )
  }

  return (
    <div className="container">
      <section className="sidebar">
        <img 
          alt="Scrum-ptious Logo"
          className="sidebar-centered"
          src="https://logoipsum.com/logo/logo-25.svg"
        />
        <nav className="sidebar__menu">
          <Sidebar
            menu={menu}
            setMenu={setMenu}
            userInfo={userInfo}
            teamUsers={teamUsers}
            createTaskItem={createTaskItem.bind(this)}
          />
        </nav>
        <button onClick={() => setLoginToken(0)}>
          Log out
        </button>
      </section>
      <section className="main">
        { menu === DASHBOARD && 
          <Dashboard
            tasks={userTasks} 
            role={role} 
            teamTasks={teamTasks} 
            allTasks={allTasks} 
          /> }
        { menu === TASKS && 
          <Tasks 
            socket={socket} 
            role={role} 
            tasks={role === 1 ? teamTasks : userTasks} 
            teamUsers={teamUsers} 
            setTaskItem={setTaskItem} 
            createTaskItem={createTaskItem} 
            deleteTaskItem={deleteTaskItem} 
            editTaskItem={editTaskItem}
          />}
        { menu === CHAT && 
          <Chat 
            socket={socket} 
            userInfo={userInfo} 
            teamUsers={teamUsers}
          />}
        { menu === PERFORMANCE_REVIEW && <PerformanceReview />}
      </section>
      <section className="user__info">
        <UserInfo userInfo={userInfo} deadlines={deadlines} /> 
      </section>
    </div>
  );
}

export default App