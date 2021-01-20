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
        <div className="task-item__modal">
          
        </div>


      <div className="dashboard-top">
        <TaskProgress tasks={props.tasks} setTaskItem={props.setTaskItem} role={props.role} teamTasks={props.teamTasks} />
      </div>
      <div className="dashboard-bottom">
        { props.role === 1 && <MyTeam teamUsers={props.teamUsers}/>}
        { props.role === 2 && <TaskResource />}
      </div>
    </div>
  )
}