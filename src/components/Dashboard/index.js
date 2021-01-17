import React from 'react';

import ProjectProgress from './ProjectProgress';
import IndependentProgress from './IndependentProgress';
import UserInfo from './UserInfo';

import '../../styles/Dashboard.css';

export default function Dashboard() {
  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        <ProjectProgress />
      </div>
      <br />
      <div className="dashboard-bottom">
        <IndependentProgress />
      </div>
    </div>
  )
}