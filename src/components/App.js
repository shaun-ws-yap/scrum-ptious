import '../styles/App.css';
import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-notifications/lib/notifications.css';
import 'react-tabs/style/react-tabs.css';

import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';
import { NotificationManager, NotificationContainer } from 'react-notifications';

import Dashboard from './Dashboard';
import Tasks from './Tasks';
import Chat from './Chat';
import Submissions from './Submissions';
import Sidebar from './Sidebar';
import UserPanel from './UserPanel';
import Login from './Login';

import useApplicationData from '../hooks/useApplicationData';
import useNotifications from '../hooks/useNotifications';
import useSocket from '../hooks/useSocket';
import useTasks from '../hooks/useTasks';


const DASHBOARD = "Dashboard";
const TASKS = "Tasks";
const CHAT = "Chat";
const SUBMISSIONS = "Submissions"

function App() {
  const [selectedMenu, setMenu] = useState(DASHBOARD);
  const [loginToken, setLoginToken] = useState(0);
  const [errorNotification, setErrorNotification] = useState({
    title: "",
    message: "",
  });
  
  const { socket } = useSocket(loginToken);

  const { 
    state,
    logout,
    setTasks,  
    setSubmissions,
    setMessages,
  } = useApplicationData(socket, loginToken, setErrorNotification);
  
  const {
    userTasks,
    userInfo,
    role,
    teamTasks,
    teamUsers,
    submissions,
    messages,
  } = state;

  const { 
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

  useEffect(() => {
    if (errorNotification.message !== "") {
      NotificationManager.error(errorNotification.title, errorNotification.message);
      setErrorNotification(prev => ({...prev, title: "", message: ""}))
    }
  }, [errorNotification]);


  const handleLogout = () => {
    logout();
    setLoginToken(0);
  }

  if ( loginToken === 0 ) {
    return (
      <Login setLogin={setLoginToken}/> 
    )
  }

  return (
    <div className="app-container">
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
        <span 
          className="logout"
          onClick={() => handleLogout()}
        >
          <p>Log out</p>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </section>
      {/* <div className="wrapper"> */}
        <section className="dashboard-main">
          { selectedMenu === DASHBOARD && 
            <Dashboard
              tasks={userTasks} 
              role={role} 
              teamTasks={teamTasks}
              teamUsers={teamUsers}
              userInfo={userInfo}
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
              setErrorNotification={setErrorNotification}
              moveTask={moveTask}
              setTasks={setTasks}
            />}
          { selectedMenu === CHAT && 
            <Chat 
              socket={socket} 
              userInfo={userInfo} 
              teamUsers={teamUsers}
              messages={messages}
              setMessages={setMessages}
            />}
          { selectedMenu === SUBMISSIONS &&
            <Submissions
              teamUsers={teamUsers}
              teamTasks={teamTasks}
              giveFeedback={giveFeedback}
              setUserNotification={setUserNotification}
              user={userInfo}
            />}
        </section>
        <section className="user__info">
          <UserPanel 
            // wide={windowWidth > 1300}
            userInfo={userInfo} 
            tasks={teamTasks} 
            teamUsers={teamUsers} 
          /> 
        </section>
      {/* </div> */}
    </div>
  );
}

export default App