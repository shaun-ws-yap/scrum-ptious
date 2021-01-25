import React from 'react';

import DeadlineListItem from './DeadlineListItem';

export default function DeadlineList(props) {

  const { deadlines, userInfo, teamUsers } = props;

  const filteredUserDeadlinesByUser = 
    deadlines
    .filter(task => task.employee_id === userInfo.id)
    .map((task) => {
      return (
        <li className="task-in-progress">
          <DeadlineListItem
            key={task.id}
            title={task.title}
            description={task.description}
            due_date={task.due_date}
            creation_date={task.creation_date}
            userInfo={userInfo}
            assignedTo={task.employee_id}
            teamUsers={teamUsers}
          />
        </li>
      )
    })

  const filteredUserDeadlines = deadlines.map(task => {
    return (
      <li className="task-in-progress">
        <DeadlineListItem
          key={task.id}
          title={task.title}
          description={task.description}
          due_date={task.due_date}
          creation_date={task.creation_date}
          userInfo={userInfo}
          assignedTo={task.employee_id}
          teamUsers={teamUsers}
        />
      </li>
    )
  })

  return (
    <div className="task-progress">
      <ul>
        { userInfo.role === 1 ? filteredUserDeadlines : filteredUserDeadlinesByUser }
      </ul>
    </div>
  )
}