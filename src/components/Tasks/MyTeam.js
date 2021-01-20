import React from 'react';
import axios from 'axios';

import MyTeamItem from './MyTeamItem';

export default function MyTeam(props) {

  const teamMembers = props.teamUsers.map((member) => {
    return (
    <li className="task-in-progress">
    <MyTeamItem
      key={member.id}
      id={member.id}
      name={member.name}
      email={member.email}
      phone_number={member.phone_number}
      role={member.role}
      setTasks={props.setTasks}
      tasks={props.tasks}
      setTeamTasks={props.setTeamTasks}
      teamTasks={props.teamTasks}
      user={props.user}
      getUserTasks={props.getUserTasks}
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