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
import useSocket from '../hooks/useSocket';
import useTasks from '../hooks/useTasks'
import { taskStatus } from '../helpers/taskStatus';
import { NotificationManager, NotificationContainer } from 'react-notifications';

import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-notifications/lib/notifications.css';
import 'react-tabs/style/react-tabs.css';

const DASHBOARD = "Dashboard";
const TASKS = "Tasks";
const CHAT = "Chat";
const SUBMISSIONS = "Submissions"

function App() {
  const [selectedMenu, setMenu] = useState(DASHBOARD);
  const [loginToken, setLoginToken] = useState(0);
  const { socket } = useSocket();
  const [notification, setNotification] = useState(0);
  const [error, setError] = useState({
    title: "",
    message: "",
  });

  const { 
    state,
    setTasks,  
    setSubmissions,
  } = useApplicationData(socket, loginToken, setError);

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
    moveTask,
    createTaskItem,
    editTaskItem,
    deleteTaskItem,
    submitTaskItem,
    giveFeedback,
  } = useTasks(loginToken, socket, submissions, setTasks, setSubmissions, setNotification);
  
  useEffect(() => {
    if (notification && notification === userInfo.id) {
      NotificationManager.warning('Click to view', 'Your Tasks Have Been Updated', 5000, () => {
        setMenu(TASKS)
      });
    }
    setNotification(0);
    // if (error.message !== "" || error.title !== "") {
    //   NotificationManager.error(`${error.title}: ${error.message}`, 'Error');
    //   setError(prev => ({...prev, title: "", message: ""}));
    // }
  }, [notification, error])

  if ( loginToken === 0 ) {
    return (
      <section className="main">
        { loginToken === 0 && <Login setLogin={setLoginToken}/> }
      </section>
    )
  }

  console.log(error);

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
            error={error}
            setError={setError}
          />
        </nav>
        <button onClick={() => setLoginToken(0)}>
          Log out
        </button>
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
            deleteTaskItem={deleteTaskItem} 
            editTaskItem={editTaskItem}
            submitTaskItem={submitTaskItem}
            error={error}
            setError={setError}
            moveTask={moveTask}
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