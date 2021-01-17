import React from 'react';

import ProjectProgress from './ProjectProgress';
import TaskProgress from './TaskProgress';
import UserInfo from './UserInfo';

import '../../styles/Dashboard.css';

const users = [
  {

  }
]

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        <TaskProgress />
        {/* <ProjectProgress /> */}
      </div>
    </div>
  )
}