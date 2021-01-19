import React from 'react';

// import ProjectProgress from './ProjectProgress';
import TaskProgress from './TaskProgress';
import TaskResource from './TaskResource';
// import UserInfo from './UserInfo';

// import '../../styles/Dashboard.css';

export default function Tasks(props) {
  
  return (
    <div className='dashboard'>
      { props.taskItem !== undefined && (
        <>
          <h1>{props.taskItem}</h1>
          <button onClick={() => props.setTaskItem(undefined)}>x</button>
        </>
      ) }
      <div className="dashboard-top">
        <TaskProgress tasks={props.tasks} setTaskItem={props.setTaskItem} />
      </div>
      <div className="dashboard-bottom">
        <TaskResource />
      </div>
    </div>
  )
}