import React from 'react';

import DeadlineList from './DeadlineList';

import filterDeadlineTasks from '../../helpers/filterDeadlineTasks';
import styled from 'styled-components';

const roles = {
  1: "Project Manager",
  2: "Employee"
}

const Deadlines = styled.div`
background: ${props => props.theme.deadlinesListBackground};
color: ${props => props.theme.deadlinesFontColor};
`;

export default function UserInfo(props) {
  const { userInfo, tasks, teamUsers, theme, setTheme } = props;
  const filteredTasks = filterDeadlineTasks(tasks);

  return (
    <div className="user-info opened">
      { userInfo && ( 
        <>
          <img alt={userInfo.name} src={userInfo.avatar} className="user-avatar"></img>
          <h5>{userInfo.name} </h5>
          <h6>{roles[userInfo.role]}</h6>
          {/* <div className="deadlines"> */}
          <Deadlines className="deadlines">
            <DeadlineList deadlines={filteredTasks} userInfo={userInfo} teamUsers={teamUsers} />
          {/* </div> */}
          </Deadlines>
        </>
      )}
    </div>
  )
}