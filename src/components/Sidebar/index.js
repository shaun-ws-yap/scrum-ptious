import React from 'react';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Moment from 'react-moment';

import SidebarItem from './SidebarItem';
import classNames from 'classnames';
import NewTaskItem from '../Tasks/NewTaskItem';

const menuItems = [
  {
    name: 'Dashboard'
  },
  {
    name: 'Tasks'
  },
  {
    name: 'Chat'
  }
];

const managerMenuItems = [
  {
    name: 'Dashboard'
  },
  {
    name: 'Tasks'
  },
  {
    name: 'Chat'
  },
  {
    name: 'Performance Review'
  }
]

export default function Sidebar(props) {
  const menuClass = classNames("sidebar__item", {
    'sidebar__item--selected': props.selected
  })

  // console.log(props)

  return (
    <ul>
     { props.userInfo && props.userInfo.role === 2 && menuItems.map(menu => {
        return (
          <SidebarItem
            key={menu.name}
            name={menu.name}
            selected={menu.name === props.menu}
            setMenu={props.setMenu}
          />
        )
      }) }

      { props.userInfo && props.userInfo.role === 1 && managerMenuItems.map(menu => {
        return (
          <>
          <SidebarItem
            key={menu.name}
            name={menu.name}
            selected={menu.name === props.menu}
            setMenu={props.setMenu}
          />
          </>
        )
      }) 
      } 
      { props.userInfo && props.userInfo.role === 1 && (

        <div>
          <NewTaskItem teamUsers={props.teamUsers} createTaskItem={props.createTaskItem} />
        </div>
      )}

      
    </ul>
  )
}