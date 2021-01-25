import React from 'react';
import classNames from 'classnames';
import Moment from 'react-moment';
import 'moment-timezone'

import { Modal, Button } from 'react-bootstrap';

import FeedbackList from './FeedbackList';
import getUserNameById from '../../helpers/getUserNameById';

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
    handleClose();
    submitTaskItem(taskItem);
  }

  return (<>
    <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>{title}</Modal.Title>
      { status === 2 && <span className="badge badge-warning">IN REVIEW</span> } 
      { status === 3 && <span className="badge badge-success">COMPLETE</span> } 
      { (status !== 3 && is_late) && <span className="badge badge-danger">LATE</span> } 
    </Modal.Header>
    <Modal.Body>
      {description}
    </Modal.Body>
    <Modal.Body>
      <p>Assigned to: {getUserNameById(teamUsers, employee_id)}</p>
      <label for="viewMode-due_date">Due on: </label>
      <Moment name="viewMode-due_date" local format="Do MMM YYYY h:mm A" >{due_date}</Moment>
      <FeedbackList
        taskId={id}
        feedbacks={submissions}
      />
    </Modal.Body>
    {(status === 0 || status === 1) &&
      <Modal.Footer>
        <Button confirm variant="primary" onClick={() => handleSubmit()}>
          Submit
        </Button>
      </Modal.Footer>
    }
  </Modal>
  </>)
}