import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';

import DeadlineListItem from './DeadlineListItem';

const deadlines = [
  {
  "id": 1,
  "title": "Create ERD",
  "description": "Design ERD to base schema off of",
  "creation_date": "2021-01-16T15:41:01.771Z",
  "due_date": "2021-01-07T01:00:00.000Z",
  "employee_id": 3,
  "status": 0,
  "is_viewed": false
  },
  {
  "id": 2,
  "title": "Create seeds",
  "description": "Insert into tables in database dummy data for testing",
  "creation_date": "2021-01-16T15:41:01.771Z",
  "due_date": "2021-01-08T01:00:00.000Z",
  "employee_id": 2,
  "status": 1,
  "is_viewed": true
  },
  {
  "id": 3,
  "title": "Setup project skeleton",
  "description": "Install packages and write boiler plate code",
  "creation_date": "2021-01-16T15:41:01.771Z",
  "due_date": "2021-01-18T01:00:00.000Z",
  "employee_id": 1,
  "status": 2,
  "is_viewed": false
  },
  {
    "id": 4,
    "title": "Setup project skeleton",
    "description": "Install packages and write boiler plate code",
    "creation_date": "2021-01-16T15:41:01.771Z",
    "due_date": "2021-01-20T01:00:00.000Z",
    "employee_id": 1,
    "status": 3,
    "is_viewed": false
  }
]

export default function DeadlineList(props) {

  const allDeadlines = props.userDeadlines.map((deadline) => {
    return (
      <li className="task-in-progress">
      <DeadlineListItem
        key={deadline.id}
        title={deadline.title}
        description={deadline.description}
        due_date={deadline.due_date}
        creation_date={deadline.creation_date}
      />
      </li>
    )
  })

  return (
    <div className="task-progress">
      <ul>
        {allDeadlines}
      </ul>
    </div>
  )
}