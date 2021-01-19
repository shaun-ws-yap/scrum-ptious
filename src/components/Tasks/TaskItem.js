import React from 'react';
// import { taskStatus } from '../../helpers/taskStatus';

export default function TaskItem(props) {
  console.log("from taskitem", props);

  return (
    <li
      onClick={() => props.setTaskItem(props.id)}
    >
      <h2>{props.title}</h2>
      <h3>{props.description}</h3>
      <h4>Assigned on: {props.due_date}</h4>
    </li>
  )
  
}