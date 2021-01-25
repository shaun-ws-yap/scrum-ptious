import React from 'react';
import axios from 'axios';

import MyTeamItem from './MyTeamItem';

export default function MyTeam(props) {
  const {
    selectTasksByUser,
    teamUsers,
  } = props;

  const teamMembers = teamUsers.map((member) => {
    return (
    <li className="team-item">
    <MyTeamItem
      key={member.id}
      member={member}
      selectTasksByUser={selectTasksByUser}
    />
    </li>
    )
  })

  return (
    <div className="team-list">
      <h1>My Team</h1>
      <ul>
      {teamMembers}
      </ul>
    </div>
  )
}