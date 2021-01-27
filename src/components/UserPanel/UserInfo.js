import React from 'react';

import DeadlineList from './DeadlineList';

import filterDeadlineTasks from '../../helpers/filterDeadlineTasks';

const roles = {
  1: "Project Manager",
  2: "Employee"
}

export default function UserInfo(props) {
  const { userInfo, tasks, teamUsers } = props;
  const filteredTasks = filterDeadlineTasks(tasks);

  return (
    <div className="user-info opened">
      { userInfo && ( 
        <>
          <img alt={userInfo.name} src={userInfo.avatar} className="user-avatar"></img>
          <h5>Welcome, {userInfo.name}</h5>
          <h6>{roles[userInfo.role]}</h6>
          <p>Past Due</p>
          <div className="deadlines">
            <DeadlineList deadlines={filteredTasks} userInfo={userInfo} teamUsers={teamUsers} />
          </div>
          <div className="socials">
            <span><i class="fab fa-github"></i><p>Clarence</p></span>
            <span><i class="fab fa-github"></i><p>Kevin</p></span>
            <span><i class="fab fa-github"></i><p>Shaun</p></span>
          </div>
        </>
      )}
    </div>
  )
}