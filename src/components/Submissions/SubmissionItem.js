import React from 'react';

export default function SubmissionItem(props) {

  const { title, name, description, is_late, is_viewed, taskData, setSelectedTask, setShow } = props;

  const handleOpen = () => {
    setSelectedTask(taskData);
    setShow(true);
  }

  return (
    <li className="submissions-list-item" onClick={() => handleOpen()}>
      <h4 className="task-title">{title}</h4>
      <h6 className="task-assigned-to">Assigned to: {name}</h6>
      <p className="task-description">{description}</p>
      { is_late && <span className="badge badge-danger">LATE</span> }
    </li>
  )
}