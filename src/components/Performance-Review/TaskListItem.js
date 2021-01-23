import React from 'react';

export default function TaskListItem(props) {

  const { title, name, description, is_late, is_viewed, taskData, setTaskItem, setShow } = props;

  const handleOpen = () => {
    setTaskItem(taskData);
    setShow(true);
  }

  return (
    <li onClick={() => handleOpen()}>
      <h4>{title}</h4>
      <h4>{name}</h4>
      <h4>{description}</h4>
      <h4>{is_late && 'LATE'}</h4>
      <h4>{is_viewed && 'Feedback Given'}</h4>
    </li>
  )
}