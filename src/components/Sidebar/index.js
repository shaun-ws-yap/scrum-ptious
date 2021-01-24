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
  } = props

  const menuItems = [
    'Dashboard',
    'Tasks',
    'Chat',
  ];
  // console.log(props)
  if (userInfo.role === 1) {
    menuItems.push('Submissions');
  }

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
          />
        </div>
      )}
    </ul>
  )
}