import React, { useState } from 'react';
import { getEmployeeName } from '../../helpers/getEmployeeName';
import { Button, Modal } from 'react-bootstrap';
import Moment from 'react-moment';

export default function Feedback(props) {
  const {
    teamUsers,
    submissions,
    selectedTask,
    show,
    setShow,
    giveFeedback
  } = props; 

  const {
    title,
    description,
    employee_id,
    creation_date,
    due_date,
    is_late,
  } = selectedTask;

  const [feedback, setFeedback] = useState({
    message: "",
  });

  const handleClose = () => {
    setShow(false);
  }

  const handleReject = () => {

  }

  const handleAccept = () => {
    console.log(selectedTask, feedback.message)
    // TODO: send to server
    setFeedback(prev => ({...prev, message: ""}));
    setShow(false);
  }

  return (

    <div className="feedback-container">
      <Modal show={show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>
            {title}
          </Modal.Title>
        </Modal.Header>

        <form class="form-group" onSubmit={event => event.preventDefault()}>
          <Modal.Body>
            <p>{description}</p>
            <p>Assigned to: {getEmployeeName(teamUsers, employee_id)}</p>
            <p>On: 
              <Moment format="Do MMM YYYY h:mm A" >{creation_date}</Moment>
            </p>
            <p>Due on: 
              <Moment format="Do MMM YYYY h:mm A" >{due_date}</Moment>
              { is_late && (<span className="badge badge-danger">LATE</span>) }
            </p>
            
            <div>
              <label for="feedback">Feedback:</label>
              <textarea
                name="feedback"
                className="form-control"
                value={feedback.message}
                onChange={event => setFeedback(prev => ({...prev, message: event.target.value}))}
              />
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button 
              variant="danger"
              onClick={(event) => handleReject()}
            >
              Reject
            </Button>
            <Button 
              variant="success"
              onClick={(event) => handleAccept()}
            >
              Accept
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}