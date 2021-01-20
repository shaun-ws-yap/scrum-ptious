import React from 'react';

import TaskItem from './TaskItem';

export default function TaskProgress(props) {

  // console.log("from task view", props.tasks)

  return (
    <div className="task-progress">
      <div className="task-assigned">
        <h1>Assigned</h1>
        { props.role === 1 && props.teamTasks.map((item, index) => {
          if (item.status === 0) {
            return (
              <TaskItem 
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                due_date={item.due_date}
                setTaskItem={props.setTaskItem}
                role={props.role}
                assignedTo={item.employee_id}
                createTaskItem={props.createTaskItem}
                teamUsers={props.teamUsers} 
              />
            )
          }
        }) }
        { props.role === 2 && props.tasks.map((item, index) => {
          if (item.status === 0) {
            return (
              <TaskItem 
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                due_date={item.due_date}
                setTaskItem={props.setTaskItem}
                role={props.role}
                assignedTo={item.employee_id}
                createTaskItem={props.createTaskItem}
                teamUsers={props.teamUsers} 
              />
            )
          }
        }) }
      </div>

      <div className="task-in-progress">
      <h1>In-Progress</h1>
        { props.role === 1 && props.teamTasks.map((item, index) => {
          if (item.status === 1 || item.status === 2) {
            return (
              <TaskItem 
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                due_date={item.due_date}
                setTaskItem={props.setTaskItem}
                role={props.role}
                assignedTo={item.employee_id}
                createTaskItem={props.createTaskItem}
                teamUsers={props.teamUsers} 
              />
            )
          }
        }) }
        { props.role === 2 && props.tasks.map((item, index) => {
          if (item.status === 1 || item.status === 2) {
            return (
              <TaskItem 
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                due_date={item.due_date}
                setTaskItem={props.setTaskItem}
                role={props.role}
                assignedTo={item.employee_id}
                createTaskItem={props.createTaskItem}
                teamUsers={props.teamUsers} 
              />
            )
          }
        }) }
      </div>

      <div className="task-completed">
      <h1>Completed</h1>
        { props.role === 1 && props.teamTasks.map((item, index) => {
          if (item.status === 3) {
            return (
              <TaskItem 
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                due_date={item.due_date}
                setTaskItem={props.setTaskItem}
                role={props.role}
                assignedTo={item.employee_id}
                createTaskItem={props.createTaskItem}
                teamUsers={props.teamUsers} 
              />
            )
          }
        }) }
        { props.role === 2 && props.tasks.map((item, index) => {
          if (item.status === 3) {
            return (
              <TaskItem 
                key={item.id}
                id={item.id}
                title={item.title}
                description={item.description}
                due_date={item.due_date}
                setTaskItem={props.setTaskItem}
                role={props.role}
                assignedTo={item.employee_id}
                createTaskItem={props.createTaskItem}
                teamUsers={props.teamUsers} 
              />
            )
          }
        }) }
      </div>
    </div>
  )
}