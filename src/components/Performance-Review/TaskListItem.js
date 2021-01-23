import React from 'react';

export default function TaskListItem(props) {

  const { title, name, description, is_late, is_viewed, taskData, setTaskItem } = props;

  return (
    <li onClick={() => setTaskItem(taskData)}>
      <h4>{title}</h4>
      <h4>{name}</h4>
      <h4>{description}</h4>
      <h4>{is_late && 'LATE'}</h4>
      <h4>{is_viewed && 'Feedback Given'}</h4>
    </li>
  )
}