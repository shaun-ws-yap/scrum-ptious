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

  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        { props.menu === DASHBOARD && props.role === 2 && <ProjectProgress projectTasks={props.tasks} />}

        { props.menu === DASHBOARD && props.role === 1 && <ProjectProgress projectTasks={props.teamTasks} />}
        
        { props.menu === TASKS && <Tasks tasks={props.tasks} setTaskItem={props.setTaskItem} taskItem={props.taskItem} role={props.role} teamTasks={props.teamTasks} createTaskItem={props.createTaskItem} />}
        { props.menu === CHAT && <Chat />}
        { props.menu === PERFORMANCE_REVIEW && <PerformanceReview />}
      </div>
      <div className="dashboard-bottom">
      {props.menu === DASHBOARD && props.role === 1 && <h1>Project Manager View</h1>}
      {props.menu === DASHBOARD && props.role === 2 && <IndependentProgress independentTasks={props.tasks} />}
      </div>
    </div>
  )
}