import React from 'react';
import { getEmployeeName } from '../../helpers/getEmployeeName';
import { Button } from 'react-bootstrap';

export default function Feedback(props) {

  const { teamUsers, taskItem } = props;

  return (
    <div className="task-progress">
      <ul>
      <h4>{taskItem.title}</h4>
      <h4>{taskItem.description}</h4>
      <h4>{getEmployeeName(teamUsers, taskItem.employee_id)}</h4>
      <h4>{taskItem.is_late && 'LATE'}</h4>
      </ul>
      <div className="feedback-textbox">
        <form>
        <textarea />
      <Button
      confirm variant="primary"
      onClick={() => console.log('Pressed')}>
        Submit
        </Button>
        </form>
      </div>
    </div>
  )
}