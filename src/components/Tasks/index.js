import React from 'react';

// import ProjectProgress from './ProjectProgress';
import TaskProgress from './TaskProgress';
import TaskResource from './TaskResource';
// import UserInfo from './UserInfo';

// import '../../styles/Dashboard.css';

export default function Tasks() {
  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        <TaskProgress />
      </div>
      <div className="dashboard-bottom">
        <TaskResource />
      </div>
    </div>
  )
}