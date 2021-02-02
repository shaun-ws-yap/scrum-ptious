import React, { useState } from 'react';
import { getEmployeeName } from '../../helpers/getEmployeeName';
import { Button, Modal } from 'react-bootstrap';
import Moment from 'react-moment';

export default function Feedback(props) {
  const {
    teamUsers,
    selectedTask,
    show,
    setShow,
    giveFeedback,
    setUserNotification,
    user
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

  const handleSubmit = (accepted) => {
    if (feedback.message === "") {
      setUserNotification(prev => ({...prev, title: "Error", message: "Please enter a feedback", type: "error", user: user.id}))
      return;
    }
    giveFeedback(feedback.message, selectedTask, accepted);    
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

        <form className="form-group" onSubmit={event => event.preventDefault()}>
          <Modal.Body>
            <p>{description}</p>
            <p>Assigned to: {getEmployeeName(teamUsers, employee_id)}</p>
            <p>On: <Moment format="Do MMM YYYY h:mm A" >{creation_date}</Moment>
            </p>
            <p>Due on: <Moment format="Do MMM YYYY h:mm A" >{due_date}</Moment>
              { is_late && (<span className="badge badge-danger">LATE</span>) }
            </p>
            
            <div>
              <label>Feedback:</label>
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
              onClick={(event) => handleSubmit(false)}
            >
              Reject
            </Button>
            <Button 
              variant="success"
              onClick={(event) => handleSubmit(true)}
            >
              Accept
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}