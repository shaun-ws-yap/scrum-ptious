import React from 'react';

import DeadlineListItem from './DeadlineListItem';

export default function DeadlineList(props) {

  const { deadlines, userInfo, teamUsers } = props;

  const filteredUserDeadlinesByUser = 
    deadlines
    .filter(task => task.employee_id === userInfo.id)
    .map((task) => {
      return (
        <DeadlineListItem
          key={task.id}
          title={task.title}
          description={task.description}
          due_date={task.due_date}
          creation_date={task.creation_date}
          userInfo={userInfo}
          assignedTo={task.employee_id}
          is_late={task.is_late}
          teamUsers={teamUsers}
          status={task.status}
        />
      )
    })

  const filteredUserDeadlines = deadlines.map(task => {
    return (
      <DeadlineListItem
        key={task.id}
        title={task.title}
        description={task.description}
        due_date={task.due_date}
        creation_date={task.creation_date}
        userInfo={userInfo}
        assignedTo={task.employee_id}
        is_late={task.is_late}
        teamUsers={teamUsers}
      />
    )
  })

  return (
    <ul className="deadline-ul">
      { userInfo.role === 1 ? filteredUserDeadlines : filteredUserDeadlinesByUser }
    </ul>
  )
}