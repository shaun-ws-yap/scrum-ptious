import '../styles/App.css';
import { useState, useEffect } from 'react';
import { Route, BrowserRouter as Router, Switch, withRouter } from 'react-router-dom';

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
import useSidePanel from '../hooks/useSidePanel';

import { taskStatus } from '../helpers/taskStatus';
import { NotificationManager, NotificationContainer } from 'react-notifications';


import 'react-pro-sidebar/dist/css/styles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import "react-datepicker/dist/react-datepicker.css";
import 'react-notifications/lib/notifications.css';
import 'react-tabs/style/react-tabs.css';
import { Button } from 'react-bootstrap';
import { ThemeProvider } from 'styled-components';
import styled from 'styled-components';
import { CgSun } from 'react-icons/cg';
import { HiMoon } from 'react-icons/hi';

const DASHBOARD = "Dashboard";
const TASKS = "Tasks";
const CHAT = "Chat";
const SUBMISSIONS = "Submissions"

function App() {
  const [selectedMenu, setMenu] = useState(DASHBOARD);
  const [theme, setTheme] = useState("light");
  const [loginToken, setLoginToken] = useState(0);
  const [errorNotification, setErrorNotification] = useState({
    title: "",
    message: "",
  });

  const LightTheme = {
    appContainerBackground: "rgba(229, 233, 236, 0.35)",
    sidebarBackground: "linear-gradient(to left, hsl(241, 96%, 56%), hsl(266, 100%, 57%));",
    userPanelBackground: "#A9A9A9",
    deadlinesFontColor: "black",
    deadlinesListBackground: "white",
    chartBackground: "white",
    chartBorder: "1px solid white",
    chatBoxBackground: "white",
    chatBoxFontColor: "black",
    memberListBackground: "white",
    myTeamBackground: 'white',
    darkModeToggle: "darkgrey",
  };

  const DarkTheme = {
    appContainerBackground: "#646060",
    sidebarBackground: "#282c36",
    userPanelBackground: "#282c36",
    deadlinesFontColor: "white",
    deadlinesListBackground: "#A9A9A9",
    chartBackground: "#757575",
    chartBorder: "1px solid #757575",
    chatBoxBackground: "#757575",
    chatBoxFontColor: "white",
    memberListBackground: "#757575",
    myTeamBackground: "#757575",
    darkModeToggle: "lightpink",
  };

  const themes = {
    light: LightTheme,
    dark: DarkTheme,
  }

  const AppContainer = styled.div`
  background: ${props => props.theme.appContainerBackground};
  transition: all .5s ease;
  `;
  
  const Navsidebar = styled.div`
  background: ${props => props.theme.sidebarBackground};
  transition: all .5s ease;
  `;


  const UserSidePanel = styled.div`
  background: ${props => props.theme.userPanelBackground};
  color: ${props => props.theme.deadlinesFontColor};
  transition: all .5s ease;
  `;

  const Toggle = styled.button`
  background: none;
  color: ${props => props.theme.darkModeToggle};
  border: none;
  border-radius: 50%;
  &:focus {
    outline: none;
  }
  transition: all .5s ease;
  `;

  const icon = theme === 'light' ? <HiMoon size={50} /> : <CgSun size={50} />

  const { socket } = useSocket();

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

  useEffect(() => {
    if (errorNotification.message !== "") {
      NotificationManager.error(errorNotification.title, errorNotification.message);
      setErrorNotification(prev => ({...prev, title: "", message: ""}))
    }
  }, [errorNotification]);

  function changeTheme() {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };


  if ( loginToken === 0 ) {
    return (
      <Login setLogin={setLoginToken}/> 
    )
  }

  return (
    <ThemeProvider theme={themes[theme]}>
      <AppContainer className="app-container">
      <NotificationContainer />
      <Navsidebar className="sidebar">
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
            theme={theme}
            setTheme={setTheme}
          />
          <Toggle onClick={changeTheme}>
            {icon}
          </Toggle>
        </nav>
        <span 
          className="logout"
          onClick={() => setLoginToken(0)}
        >
            Log out
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </span>
        </Navsidebar>
      {/* <div className="wrapper"> */}
        <section className="dashboard-main">
          { selectedMenu === DASHBOARD && 
            <Dashboard
              tasks={userTasks} 
              role={role} 
              teamTasks={teamTasks}
              teamUsers={teamUsers}
              theme={theme}
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
              theme={theme}
            />}
          { selectedMenu === CHAT && 
            <Chat 
              socket={socket} 
              userInfo={userInfo} 
              teamUsers={teamUsers}
              theme={theme}
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
        <UserSidePanel className="user__info">
          <UserPanel 
            // wide={windowWidth > 1300}
            userInfo={userInfo} 
            tasks={teamTasks} 
            teamUsers={teamUsers}
            theme={theme}
          />
        </UserSidePanel>
      {/* </div> */}
    </AppContainer>
    </ThemeProvider>
  );
}

export default App