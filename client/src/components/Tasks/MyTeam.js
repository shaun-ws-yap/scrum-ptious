import React from 'react';

import MyTeamItem from './MyTeamItem';
import '../../styles/MyTeam.css';

export default function MyTeam(props) {
  const {
    selectTasksByUser,
    teamUsers,
  } = props;

  const teamMembers = teamUsers.map((member) => {
    return (
    <MyTeamItem
      key={member.id}
      member={member}
      selectTasksByUser={selectTasksByUser}
    />
    )
  })

  return (
    <div className="team-list">
      {teamMembers}
    </div>
  )
}