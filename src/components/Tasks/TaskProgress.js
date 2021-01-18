import React from 'react';

import TaskItem from './TaskItem';

export default function TaskProgress(props) {

  


  return (
    <div className="task-progress">
      <div className="task-assigned">
        <h1>Assigned</h1>
        {props.tasks.map((item, index) => {
          if (item.status === 0) {
            return (
              <TaskItem 
                key={index}
                title={item.title}
                description={item.description}
                due_date={item.due_date}
              />
            )
          }
        })}
      </div>

      <div className="task-in-progress">
      <h1>In-Progress</h1>
        {props.tasks.map((item, index) => {
          if (item.status === 1) {
            return (
              <TaskItem 
                key={index}
                title={item.title}
                description={item.description}
                due_date={item.due_date}
              />
            )
          }
        })}
      </div>

      <div className="task-completed">
      <h1>Completed</h1>
        {props.tasks.map((item, index) => {
          if (item.status === 4) {
            return (
              <TaskItem 
                key={index}
                title={item.title}
                description={item.description}
                due_date={item.due_date}
              />
            )
          }
        })}
      </div>
    </div>
  )
}