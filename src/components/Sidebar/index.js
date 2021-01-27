import '../../styles/Sidebar.css';

import React from 'react';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Moment from 'react-moment';

import SidebarItem from './SidebarItem';
import NewTaskItem from '../Tasks/NewTaskItem';

export default function Sidebar(props) {
  const {
    selectedMenu,
    userInfo,
    teamUsers,
    setMenu,
    createTaskItem,
    error,
    setErrorNotification,
    logout,
    setLoginToken,
  } = props

  const menuItems = [
    'Dashboard',
    'Tasks',
    'Chat',
    userInfo.role === 1 ? 'Submissions' : ''
  ];

  return (
    <nav className="sidebar__menu">
      <img 
        alt="Scrum-ptious Logo"
        className="sidebar-centered"
        src="https://logoipsum.com/logo/logo-25.svg"
      />
      <ul>
      { menuItems.map((item, index) => {
        return (
          <SidebarItem
            key={index}
            name={item}
            selected={selectedMenu === item}
            setMenu={setMenu}
          />)
        })}
        { userInfo.role === 1 && (
          <div key={4}>
            <NewTaskItem
              team={userInfo.team_id}
              teamUsers={teamUsers} 
              createTaskItem={createTaskItem} 
              error={error}
              setErrorNotification={setErrorNotification}
            />
          </div>
        )}
      </ul>
    </nav>
  )
}