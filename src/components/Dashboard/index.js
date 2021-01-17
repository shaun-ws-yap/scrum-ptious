import React from 'react';

import ProjectProgress from './ProjectProgress';
// import TaskProgress from './TaskProgress';
// import TaskResource from './TaskResource';
import UserInfo from './UserInfo';

import '../../styles/Dashboard.css';

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        <ProjectProgress />
      </div>
      <div className="dashboard-bottom">
        {/* <IndependentProgress /> */}
      </div>
    </div>
  )
}