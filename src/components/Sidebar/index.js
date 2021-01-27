import '../../styles/Sidebar.css';

import React from 'react';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Moment from 'react-moment';
import styled from 'styled-components';

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
    setErrorNotification
  } = props

  const menuItems = [
    'Dashboard',
    'Tasks',
    'Chat',
    userInfo.role === 1 ? 'Submissions' : ''
  ];

  function changeTheme() {
    if (props.theme === "light") {
      props.setTheme("dark");
    } else {
      props.setTheme("light");
    }
  };

  return (
    <ul>
     { menuItems.map((item, index) => {
        return (
          <SidebarItem
            key={index}
            name={item}
            selected={selectedMenu === item}
            setMenu={setMenu}
          />
        )
      })}
      { userInfo.role === 1 && (
        <div>
          <NewTaskItem
            team={userInfo.team_id}
            teamUsers={teamUsers} 
            createTaskItem={createTaskItem} 
            error={error}
            setErrorNotification={setErrorNotification}
          />
        </div>
      )}
      <button onClick={changeTheme}>
        Theme Changer
        </button>
    </ul>
  )
}