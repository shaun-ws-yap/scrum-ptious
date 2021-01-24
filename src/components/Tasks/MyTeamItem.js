import React from 'react';

export default function MyTeamItem(props) {
  const {
    member,
    selectTasksByUser,
  } = props;

  const { role, name, email, phone_number } = member;

  const roles = {
    1 : 'Project Manager',
    2 : 'Employee'
  }

  return (
    <li className="team-progress">
      <button onClick={() => selectTasksByUser(member)}>
        Test
      </button>
      <h4>{name}</h4>
      <h5>{email}</h5>
      <h5>{phone_number}</h5>
      <h6>{roles[role]}</h6>
    </li>
  )
}