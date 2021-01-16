import React from 'react';
import * as MdIcons from 'react-icons/md';

export const SidebarItem = [
  {
    title: 'Dashboard',
    path: '/',
    icon: <MdIcons.MdDashboard />,
    className: "nav-text"
  },
  {
    title: 'Tasks',
    path: '/tasks',
    icon: <MdIcons.MdList />,
    className: "nav-text"
  },
  {
    title: 'Team Chat',
    path: '/teamchat',
    icon: <MdIcons.MdChat />,
    className: "nav-text"
  }
]