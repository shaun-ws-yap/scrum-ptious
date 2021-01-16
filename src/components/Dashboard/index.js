import React from 'react';

import ProjectProgress from './ProjectProgress';
import TaskProgress from './TaskProgress';
import UserInfo from './UserInfo';

import '../../styles/Dashboard.css';

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <h1>Your Dashboard</h1>
      <div className="dashboard-top">
        <ProjectProgress />
        <UserInfo />
      </div>
      <TaskProgress />
    </div>
  )
}