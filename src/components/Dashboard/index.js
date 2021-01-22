import React, { useState } from 'react';

import ProjectProgress from './ProjectProgress';
import IndependentProgress from './IndependentProgress';

import '../../styles/Dashboard.css';

export default function Dashboard(props) {
  const { tasks, teamTasks, allTasks, role } = props;

  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        <ProjectProgress teamTasks={teamTasks} allTasks={allTasks} />
      </div>
      <div className="dashboard-bottom">
      {role === 1 && <h1>Project Manager View</h1>}
      {role === 2 && <IndependentProgress independentTasks={tasks} />}
      </div>
    </div>
  )
}