import React from 'react';

import TaskItem from './TaskItem';

const tasks = [
  {
  "id": 1,
  "title": "Create ERD",
  "description": "Design ERD to base schema off of",
  "creation_date": "2021-01-16T15:41:01.771Z",
  "due_date": "2021-01-21T01:00:00.000Z",
  "employee_id": 3,
  "status": 0,
  "is_viewed": false
  },
  {
  "id": 3,
  "title": "Create seeds",
  "description": "Insert into tables in database dummy data for testing",
  "creation_date": "2021-01-16T15:41:01.771Z",
  "due_date": "2021-01-16T01:00:00.000Z",
  "employee_id": 2,
  "status": 2,
  "is_viewed": true
  },
  {
  "id": 4,
  "title": "Setup project skeleton",
  "description": "Install packages and write boiler plate code",
  "creation_date": "2021-01-16T15:41:01.771Z",
  "due_date": "2021-01-11T01:00:00.000Z",
  "employee_id": 1,
  "status": 3,
  "is_viewed": false
  }
]

export default function TaskProgress(props) {
  return (
    <div className="task-progress">
      <div className="task-assigned">
        <h1>Assigned</h1>
        {tasks.map((item, index) => {
          return (
            <TaskItem 
              key={index}
              title={item.title}
              description={item.description}
              due_date={item.due_date}
            />
          )
        })}
      </div>

      <div className="task-in-progress">
      <h1>In-Progress</h1>
        {tasks.map((item, index) => {
          return (
            <TaskItem 
              key={index}
              title={item.title}
              description={item.description}
              due_date={item.due_date}
            />
          )
        })}
      </div>

      <div className="task-completed">
      <h1>Completed</h1>
        {tasks.map((item, index) => {
          return (
            <TaskItem 
              key={index}
              title={item.title}
              description={item.description}
              due_date={item.due_date}
            />
          )
        })}
      </div>
    </div>
  )
}