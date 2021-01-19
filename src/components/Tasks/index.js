import React, { useState } from 'react';


// import ProjectProgress from './ProjectProgress';
import TaskProgress from './TaskProgress';
import TaskResource from './TaskResource';

// import UserInfo from './UserInfo';

// import '../../styles/Dashboard.css';

export default function Tasks(props) {

  return (
    <div className='dashboard'>
        <div className="task-item__modal">
          
        </div>


      <div className="dashboard-top">
        <TaskProgress tasks={props.tasks} setTaskItem={props.setTaskItem} role={props.role} />
      </div>
      <div className="dashboard-bottom">
        <TaskResource />
      </div>
    </div>
  )
}