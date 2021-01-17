import React from 'react';

export default function TaskItem(props) {
  return (
    <li>
      <h2>{props.title}</h2>
      <h3>{props.description}</h3>
      <h4>Assigned on: {props.due_date}</h4>
    </li>
  )
  
}