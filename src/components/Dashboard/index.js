import React, { useState } from 'react';

import ProjectProgress from './ProjectProgress';
import IndependentProgress from './IndependentProgress';
import EmployeeProgress from './EmployeeProgress';

import '../../styles/Dashboard.css';

export default function Dashboard(props) {
  const { tasks, teamTasks, teamUsers, role, theme, setTheme } = props;

  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        <ProjectProgress teamTasks={teamTasks} theme={theme} setTheme={setTheme} />
      </div>
      <div className="dashboard-bottom">
      {role === 1 && <EmployeeProgress independentTasks={tasks} teamTasks={teamTasks} teamUsers={teamUsers} theme={theme} setTheme={setTheme} />}
      {role === 2 && <IndependentProgress independentTasks={tasks} theme={theme} setTheme={setTheme} />}
      </div>
    </div>
  )
}