import '../styles/App.css';
import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';

import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Chat from './Chat';
import Submissions from './Submissions';
import Sidebar from './Sidebar';
import UserInfo from './Dashboard/UserInfo';
import Login from './Login';

import useApplicationData from '../hooks/useApplicationData';
import useNotifications from '../hooks/useNotifications';
import useSocket from '../hooks/useSocket';
import useTasks from '../hooks/useTasks'
import { taskStatus } from '../helpers/taskStatus';
import { NotificationManager, NotificationContainer } from 'react-notifications';

import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-notifications/lib/notifications.css';
import 'react-tabs/style/react-tabs.css';
import { Button } from 'react-bootstrap';

const DASHBOARD = "Dashboard";
const TASKS = "Tasks";
const CHAT = "Chat";
const SUBMISSIONS = "Submissions"

function App() {
  const [selectedMenu, setMenu] = useState(DASHBOARD);
  const [loginToken, setLoginToken] = useState(0);
  const { socket } = useSocket();
  const [errorNotification, setErrorNotification] = useState({
    title: "",
    message: "",
  });

  const { 
    state,
    setTasks,  
    setSubmissions,
  } = useApplicationData(socket, loginToken, setErrorNotification);
  
  const {
    userTasks,
    userInfo,
    role,
    teamTasks,
    teamUsers,
    deadlines,
    submissions
  } = state;

  const { 
    userNotification,
    managerNotification,
    setUserNotification,
    setManagerNotification
  } = useNotifications(userInfo, setMenu, NotificationManager);

  const {
    moveTask,
    createTaskItem,
    editTaskItem,
    deleteTaskItem,
    submitTaskItem,
    giveFeedback,
  } = useTasks(loginToken, socket, submissions, setTasks, setSubmissions, setUserNotification, setManagerNotification, userInfo);


  if ( loginToken === 0 ) {
    return (
      <section className="main">
        { loginToken === 0 && <Login setLogin={setLoginToken}/> }
      </section>
    )
  }

  return (
    <div className="container">
      <NotificationContainer />
      <section className="sidebar">
        <img 
          alt="Scrum-ptious Logo"
          className="sidebar-centered"
          src="https://logoipsum.com/logo/logo-25.svg"
        />
        <nav className="sidebar__menu">
          <Sidebar
            selectedMenu={selectedMenu}
            userInfo={userInfo}
            teamUsers={teamUsers}
            setMenu={setMenu}
            createTaskItem={createTaskItem}
            errorNotification={errorNotification}
            setErrorNotification={setErrorNotification}
          />
        </nav>
        <span className="logout"
        onClick={() => setLoginToken(0)}>
          Log out
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        </span>
      </section>
      <section className="main">
        { selectedMenu === DASHBOARD && 
          <Dashboard
            tasks={userTasks} 
            role={role} 
            teamTasks={teamTasks}
            teamUsers={teamUsers}
          /> }
        { selectedMenu === TASKS && 
          <Tasks 
            socket={socket} 
            role={role} 
            tasks={role === 1 ? teamTasks : userTasks} 
            teamUsers={teamUsers} 
            submissions={submissions}
            deleteTaskItem={deleteTaskItem} 
            editTaskItem={editTaskItem}
            submitTaskItem={submitTaskItem}
            errorNotification={errorNotification}
            setErrorNotification={setErrorNotification}
            moveTask={moveTask}
            setTasks={setTasks}
          />}
        { selectedMenu === CHAT && 
          <Chat 
            socket={socket} 
            userInfo={userInfo} 
            teamUsers={teamUsers}
          />}
        { selectedMenu === SUBMISSIONS &&
          <Submissions
            teamUsers={teamUsers}
            teamTasks={teamTasks}
            giveFeedback={giveFeedback}
          />}
      </section>
      <section className="user__info">
        <UserInfo userInfo={userInfo} tasks={teamTasks} teamUsers={teamUsers} /> 
      </section>
    </div>
  );
}

export default App