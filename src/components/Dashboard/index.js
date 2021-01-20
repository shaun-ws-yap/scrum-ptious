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

  const { menu, tasks, teamTasks, allTasks, setTaskItem, taskItem, role, userInfo, teamUsers, setTeamTasks, setAllTasks } = props;

  // console.log(props.tasks);
  // Make a func:
  // takes in an emp ID
  // takes current state of teamTasks
  // filter out where emp ID === emp ID to get that employee's tasks
  // from myTeamItem, pass in props.^function(member.id)

  console.log(props.allTasks);
  
  const getUserTasks = function(empID) {
    const selectedUserTasks = [];
    allTasks.filter((userTask) => {
      if (userTask.employee_id === empID) {
        selectedUserTasks.push(userTask);
      }
    });

    setTeamTasks(selectedUserTasks);
  }

  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        { menu === DASHBOARD && <ProjectProgress teamTasks={teamTasks} />}
        { menu === TASKS && <Tasks getUserTasks={getUserTasks} user={props.user} tasks={tasks} setTaskItem={setTaskItem} taskItem={taskItem} role={role} teamTasks={teamTasks} teamUsers={teamUsers} tasks={props.tasks} setTasks={props.setTasks} setTeamTasks={setTeamTasks} />}
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