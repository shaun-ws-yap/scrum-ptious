import React from 'react';

export default function Feedback(props) {

  const { teamUsers, taskItem } = props;

  const employeeName = (data, empID) => {
    let result = '';

    for (const index of data) {
      if (index.id === empID) {
        result = index.name;
      }
    }
    return result;
  }

  return (
    <div className="task-progress">
      <ul>
      <h4>{taskItem.title}</h4>
      <h4>{taskItem.description}</h4>
      <h4>{employeeName(teamUsers, taskItem.employee_id)}</h4>
      <h4>{taskItem.is_late && 'LATE'}</h4>
      </ul>
      <div className="feedback-textbox">
        <textarea />
      </div>
    </div>
  )
}