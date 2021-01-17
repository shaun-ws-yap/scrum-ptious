import React from 'react';

export default function DeadlineListItem(props) {
  return (
    <li>
      <h2>{props.title}</h2>
      <h3>{props.description}</h3>
      <h3>Due: {props.due_date}</h3>
      <h4>Assigned on: {props.creation_date}</h4>
    </li>
  )
  
}