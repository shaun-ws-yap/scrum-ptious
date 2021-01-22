import React, { useState } from 'react';


// import ProjectProgress from './ProjectProgress';
import TaskProgress from './TaskProgress';
import MyTeam from './MyTeam';
import TaskResource from './TaskResource';
// import UserInfo from './UserInfo';

// import '../../styles/Dashboard.css';

export default function Tasks(props) {
  const {
    role,
    tasks,
    teamUsers,
    setTaskItem,
    createTaskItem,
    editTaskItem,
    deleteTaskItem,
    getUserTasks,
  } = props

  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        <TaskProgress 
          role={role} 
          tasks={tasks} 
          teamUsers={teamUsers} 
          setTaskItem={setTaskItem} 
          createTaskItem={createTaskItem} 
          deleteTaskItem={deleteTaskItem} 
          editTaskItem={editTaskItem}
        />
      </div>
      <div className="dashboard-bottom">
        { role === 1 && 
          <MyTeam 
            teamUsers={teamUsers} 
            getUserTasks={getUserTasks}  
          />}
        { role === 2 && <TaskResource />}
      </div>
    </div>
  )
}