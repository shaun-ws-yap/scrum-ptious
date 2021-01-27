import React from 'react';

import SubmissionItem from './SubmissionItem';
import { getEmployeeName } from '../../helpers/getEmployeeName';
import styled from 'styled-components';

export default function SubmisionList(props) {

  const { 
    teamUsers, 
    teamTasks, 
    setSelectedTask, 
    setShow 
  } = props;

  const SubmittedHeader = styled.h3`
  color: ${props => props.theme.chatBoxFontColor};
  `;

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
      <SubmittedHeader>Submitted Tasks</SubmittedHeader>
      <ul>
        {listedTeamTasks}
      </ul>
    </div>
  )
}
