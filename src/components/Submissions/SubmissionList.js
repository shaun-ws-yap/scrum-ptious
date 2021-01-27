import React from 'react';

import SubmissionItem from './SubmissionItem';
import { getEmployeeName } from '../../helpers/getEmployeeName';

export default function SubmisionList(props) {

  const { 
    teamUsers, 
    teamTasks, 
    setSelectedTask, 
    setShow 
  } = props;

  const listedTeamTasks = teamTasks.map((task) => {
    return (
      task.status === 2 &&
      <SubmissionItem
        key={task.id}
        title={task.title}
        description={task.description}
        name={getEmployeeName(teamUsers, task.employee_id)}
        is_late={task.is_late}
        is_viewed={task.is_viewed}
        taskData={task}
        setSelectedTask={setSelectedTask}
        setShow={setShow}
      />
    )
  })

  return (
    <div className="submissions-list">
      <h3>Submitted Tasks</h3>
      <ul>
        {listedTeamTasks}
      </ul>
    </div>
  )
}
