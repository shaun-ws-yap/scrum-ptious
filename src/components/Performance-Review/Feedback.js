import React, { useState } from 'react';
import { getEmployeeName } from '../../helpers/getEmployeeName';
import { Button, Modal } from 'react-bootstrap';
import Moment from 'react-moment';

export default function Feedback(props) {

  const { teamUsers, taskItem } = props;
  const [feedback, setFeedback] = useState({
    message: "",
  });

  const handleClose = () => {
    props.setShow(false);
  }

  const handleSubmit = () => {
    console.log(taskItem, feedback.message)
    // TODO: send to server
    setFeedback(prev => ({...prev, message: ""}));
    props.setShow(false);
  }

  return (

    <div className="feedback-container">
      <Modal show={props.show} onHide={handleClose} >
        <Modal.Header closeButton>
          <Modal.Title>
            {taskItem.title}
          </Modal.Title>
        </Modal.Header>

        <form class="form-group" onSubmit={event => event.preventDefault()}>
          <Modal.Body>
            <p>{taskItem.description}</p>
            <p>Assigned to: {getEmployeeName(teamUsers, taskItem.employee_id)}</p>
            <p>On: 
              <Moment format="Do MMM YYYY h:mm A" >{taskItem.creation_date}</Moment>
            </p>
            <p>Due on: 
              <Moment format="Do MMM YYYY h:mm A" >{taskItem.due_date}</Moment>
              { taskItem.is_late && (<span className="badge badge-danger">LATE</span>) }
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
              variant="primary"
              onClick={(event) => handleSubmit()}
            >
              Submit
            </Button>
          </Modal.Footer>
        </form>
      </Modal>
    </div>
  )
}