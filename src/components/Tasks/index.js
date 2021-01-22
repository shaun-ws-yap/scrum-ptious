import React, { useState } from 'react';


// import ProjectProgress from './ProjectProgress';
import TaskProgress from './TaskProgress';
import MyTeam from './MyTeam';
import TaskResource from './TaskResource';
// import UserInfo from './UserInfo';

// import '../../styles/Dashboard.css';

export default function Tasks(props) {

  return (
    <div className='dashboard'>


      <div className="dashboard-top">
        <TaskProgress 
          role={role} 
          tasks={tasks} 
          setTaskItem={setTaskItem} 
          createTaskItem={createTaskItem} 
          deleteTaskItem={deleteTaskItem} 
          editTaskItem={editTaskItem}
        />
      </div>
      <div className="dashboard-bottom">
        { props.role === 1 && <MyTeam getUserTasks={props.getUserTasks} user={props.user} teamUsers={props.teamUsers} tasks={props.tasks} setTasks={props.setTasks} teamTasks={props.teamTasks} setTeamTasks={props.setTeamTasks} allTasks={props.allTasks} />}
        { props.role === 2 && <TaskResource />}
      </div>
    </div>
  )
}