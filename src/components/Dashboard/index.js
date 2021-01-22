import React, { useState } from 'react';

import ProjectProgress from './ProjectProgress';
import IndependentProgress from './IndependentProgress';
import EmployeeProgress from './EmployeeProgress';

import '../../styles/Dashboard.css';

export default function Dashboard(props) {
  const { tasks, teamTasks, allTasks, role } = props;

  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        <ProjectProgress teamTasks={teamTasks} allTasks={allTasks} />
      </div>
      <div className="dashboard-bottom">
      {menu === DASHBOARD && role === 1 && <EmployeeProgress independentTasks={tasks} teamTasks={teamTasks} allTasks={allTasks} teamUsers={teamUsers} />}
      {menu === DASHBOARD && role === 2 && <IndependentProgress independentTasks={tasks} />}
      </div>
    </div>
  )
}