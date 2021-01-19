import React from 'react';

export default function DeadlineListItem(props) {
  return (
    <li>
      <h4>{props.title}</h4>
      <p>{props.description}</p>
      <h5>Due: {props.due_date}</h5>
      <h6>Assigned on: {props.creation_date}</h6>
    </li>
  )
  
}