import React, { useState } from 'react';


// import ProjectProgress from './ProjectProgress';
import TaskProgress from './TaskProgress';
import MyTeam from './MyTeam';
import TaskResource from './TaskResource';
// import UserInfo from './UserInfo';

// import '../../styles/Dashboard.css';

export default function Tasks(props) {
  const {
    setTaskItem,
    role,
    teamTasks,
    tasks,
    setTasks,
    createTaskItem,
    deleteTaskItem,
    allTasks,
    getUserTasks,
    user,
    teamUsers,
    setTeamTasks
  } = props

  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        <TaskProgress 
          setTaskItem={setTaskItem} 
          role={role} 
          teamTasks={teamTasks} 
          tasks={tasks} 
          setTasks={setTasks} 
          createTaskItem={createTaskItem} 
          deleteTaskItem={deleteTaskItem} 
          allTasks={allTasks} 
        />
      </div>
      <div className="dashboard-bottom">
        { role === 1 && 
          <MyTeam 
            getUserTasks={getUserTasks} 
            user={user} 
            teamUsers={teamUsers} 
            tasks={tasks} 
            setTasks={setTasks} 
            teamTasks={teamTasks} 
            setTeamTasks={setTeamTasks} 
            allTasks={allTasks} 
          />}
        { role === 2 && <TaskResource />}
      </div>
    </div>
  )
}