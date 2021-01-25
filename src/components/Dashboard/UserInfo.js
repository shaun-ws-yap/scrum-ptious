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
    <div className="user-info">
      { userInfo && ( 
        <>
        <h1>User</h1> 
        <img src="https://randomuser.me/api/portraits/men/73.jpg" className="user-avatar"></img>
        <h4>{userInfo.name} </h4>
        <h5>{roles[userInfo.role]}</h5>
        <div>
          <DeadlineList deadlines={filteredTasks} userInfo={userInfo} teamUsers={teamUsers} />
        </div>
        </>
        ) 
      }
    </div>
  )
} 