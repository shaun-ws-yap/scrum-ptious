import React from 'react';

export default function MyTeamItem(props) {

  const roles = {
    1 : 'Project Manager',
    2 : 'Employee'
  }

  return (
    <li className="task-progress">
      <h4>{props.name}</h4>
      <h5>{props.email}</h5>
      <h5>{props.phone_number}</h5>
      <h6>{roles[props.role]}</h6>
    </li>
  )
}