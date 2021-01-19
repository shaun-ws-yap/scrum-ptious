import React, { useState } from 'react';

import ProjectProgress from './ProjectProgress';
import IndependentProgress from './IndependentProgress';
import Tasks from '../Tasks';
import Chat from '../Chat'
import PerformanceReview from './PerformanceReview';

import '../../styles/Dashboard.css';

export default function Dashboard(props) {
  const DASHBOARD = "Dashboard";
  const TASKS = "Tasks";
  const CHAT = "Chat";
  const PERFORMANCE_REVIEW = "Performance Review"

  const { menu, tasks, teamTasks, setTaskItem, taskItem, role, userInfo } = props;

  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        { menu === DASHBOARD && <ProjectProgress projectTasks={tasks} teamTasks={teamTasks} />}
        { menu === TASKS && <Tasks tasks={tasks} setTaskItem={setTaskItem} taskItem={taskItem} role={role} teamTasks={teamTasks} />}
        { menu === CHAT && <Chat userInfo={userInfo}/>}
        { menu === PERFORMANCE_REVIEW && <PerformanceReview />}
      </div>
      <div className="dashboard-bottom">
      {menu === DASHBOARD && role === 1 && <h1>Project Manager View</h1>}
      {menu === DASHBOARD && role === 2 && <IndependentProgress independentTasks={tasks} />}
      </div>
    </div>
  )
}