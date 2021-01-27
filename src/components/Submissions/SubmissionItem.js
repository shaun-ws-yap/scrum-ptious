import React from 'react';

import Moment from 'react-moment';

export default function SubmissionItem(props) {

  const { title, name, description, is_late, is_viewed, taskData, setSelectedTask, setShow } = props;

  const handleOpen = () => {
    setSelectedTask(taskData);
    setShow(true);
  }

  return (
    <div className="submission-card-item" onClick={event => handleOpen()}>
      <h5>{title}</h5>
      <p className="submission-card-name'">{name}</p>
      <p className="submission-card-description">{description}</p>
      { is_late && <span className="badge badge-danger submission-badge">LATE</span> }
      <div className="submission-card-item-dates">
        <div className="card-date">
          <label for="creation_date">On: </label>
          <Moment name="creation_date" format="Do MMM YYYY h:mm A" >{taskData.creation_date}</Moment> 
        </div>
        <div className="card-date">
          <label for="due_date">Due:</label>
          <Moment name="due_date" format="Do MMM YYYY h:mm A" >{taskData.due_date}</Moment>
        </div>
      </div>
      <div className="submission-card-item-badge-container">
        <div className="submission-card-item-badge">
          { taskData.status === 0 && <i class="fas fa-people-arrows"></i> }
          { taskData.status === 1 && <i class="fas fa-spinner"></i> }
        </div>
      </div>
    </div>
  )
}