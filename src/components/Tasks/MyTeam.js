import React from 'react';
import axios from 'axios';

import MyTeamItem from './MyTeamItem';

export default function MyTeam(props) {
  const {
    selectTasks,
    teamUsers,
  } = props;

  const teamMembers = teamUsers.map((member) => {
    return (
    <li className="task-in-progress">
    <MyTeamItem
      key={member.id}
      member={member}
      selectTasks={selectTasks}
    />
    </li>
    )
  })

  return (
    <div className="task-progress">
      <h1>My Team</h1>
      <ul>
      {teamMembers}
      </ul>
    </div>
  )
}