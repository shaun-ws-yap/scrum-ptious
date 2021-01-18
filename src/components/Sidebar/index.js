import React from 'react';
import { ProSidebar, SidebarHeader, SidebarFooter, SidebarContent, Menu, MenuItem } from 'react-pro-sidebar';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Moment from 'react-moment';

import SidebarItem from './SidebarItem';
import classNames from 'classnames';

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

export default function Sidebar(props) {
  const menuClass = classNames("sidebar__item", {
    'sidebar__item--selected': props.selected
  })

  const options = menuItems.map(menu => {
    return (
      <SidebarItem
        key={menu.name}
        name={menu.name}
        selected={menu.name === props.menu}
        setMenu={props.setMenu}
      
    )
  })

  return (
    <ul>
      {options}
    </ul>
  )
}