import React from 'react';

import MyTeamItem from './MyTeamItem';

export default function MyTeam(props) {

  console.log(props.teamUsers);

  const teamMembers = props.teamUsers.map((member) => {
    return (
    <li className="task-in-progress">
    <MyTeamItem
      key={member.id}
      name={member.name}
      email={member.email}
      phone_number={member.phone_number}
      role={member.role}
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