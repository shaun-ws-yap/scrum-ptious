import React, { useState } from 'react';

import ProjectProgress from './ProjectProgress';
import IndependentProgress from './IndependentProgress';
import Tasks from '../Tasks';
import Chat from '../Chat'

import '../../styles/Dashboard.css';

export default function Dashboard(props) {
  const DASHBOARD = "Dashboard";
  const TASKS = "Tasks";
  const CHAT = "Chat";

  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        { props.menu === DASHBOARD && <ProjectProgress projectTasks={props.tasks} />}
        { props.menu === TASKS && <Tasks tasks={props.tasks} />}
        { props.menu === CHAT && <Chat />}
      </div>
      <div className="dashboard-bottom">
      { props.menu === DASHBOARD && <IndependentProgress />}
      </div>
    </div>
  )
}