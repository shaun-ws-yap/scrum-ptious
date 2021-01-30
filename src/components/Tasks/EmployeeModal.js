import React from 'react';
import Moment from 'react-moment';
import 'moment-timezone'

import { Modal, Button } from 'react-bootstrap';

import FeedbackList from './FeedbackList';
import getUserNameById from '../../helpers/getUserNameById';
import getTaskStatus from '../../helpers/getTaskStatus';
import { NotificationManager } from 'react-notifications';

export default function EmployeeModal(props) {
  const {
    show,
    handleClose,
    taskItem,
    teamUsers,
    submissions,
    submitTaskItem,
  } = props;

  const { 
    id,
    employee_id, 
    title, 
    description, 
    due_date,
    status,
    is_late
  } = taskItem;

  const handleSubmit= () => {
    NotificationManager.success('Task sent for review', 'Submitted');
    handleClose();
    submitTaskItem(taskItem);
  }

  const taskInfo = getTaskStatus(status);

  return (<>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      {description}
    </Modal.Body>
    <Modal.Body>
      <p>Assigned to: {getUserNameById(teamUsers, employee_id)}</p>
      <label>Due on: </label>
      <Moment name="viewMode-due_date" local format="Do MMM YYYY h:mm A" >{due_date}</Moment>
      <FeedbackList
        taskId={id}
        feedbacks={submissions}
      />
    </Modal.Body>
    <Modal.Footer>
      { <span className={`badge badge-${taskInfo.type}`}>{taskInfo.status}</span> }
      { is_late && <span className="badge badge-danger">LATE</span> } 
      { status === 1 &&
          <button className="btn btn-primary" onClick={() => handleSubmit()}>
            Submit
          </button>
      }
    </Modal.Footer>
  </Modal>
  </>)
}