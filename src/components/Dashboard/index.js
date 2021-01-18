import React, { useState } from 'react';

import ProjectProgress from './ProjectProgress';
import IndependentProgress from './IndependentProgress';
import TaskItem from './TaskItem';

import '../../styles/Dashboard.css';

export default function Dashboard(props) {
  const DASHBOARD = "Dashboard";
  const TASKS = "Tasks";
  const CHAT = "Chat";

  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        { props.menu === DASHBOARD && <ProjectProgress projectTasks={props.tasks} />}
        { props.menu === TASKS && <TaskItem />}
        { props.menu === CHAT && <h1>Chat</h1>}
      </div>
      <div className="dashboard-bottom">
      { props.menu === DASHBOARD && <IndependentProgress />}
      </div>
    </div>
  )
}