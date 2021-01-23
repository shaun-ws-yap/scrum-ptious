import React from 'react';
import { teamTaskStatus } from '../../helpers/taskStatus';
import EmployeeProgressItem from './EmployeeProgressItem';

export default function EmployeeProgress(props) {

const userData = props.teamUsers.filter(user => user.role !== 1).map((user) => {
  const taskData = teamTaskStatus(props.teamTasks, user.team_id, user.id);

  return (
    <li className="user-in-progress">
      <EmployeeProgressItem
      key={user.id}
      name={user.name}
      assigned={taskData.assigned}
      inProgress={taskData.inProgress}
      inReview={taskData.inReview}
      late={taskData.late}
      complete={taskData.complete}
      />
    </li>
  )
})

  return (
    <div className="employee-progress">
      {userData}
    </div>
  )
}