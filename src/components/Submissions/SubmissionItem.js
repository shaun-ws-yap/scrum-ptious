import React from 'react';

export default function SubmissionItem(props) {

  const { title, name, description, is_late, is_viewed, taskData, setSelectedTask, setShow } = props;

  const handleOpen = () => {
    setSelectedTask(taskData);
    setShow(true);
  }

  return (
    <li onClick={() => handleOpen()}>
      <h4>{title}</h4>
      <h4>{name}</h4>
      <h4>{description}</h4>
      { is_late && <span className="badge badge-danger">LATE</span> }
      <h4>{is_viewed && 'Feedback Given'}</h4>
    </li>
  )
}