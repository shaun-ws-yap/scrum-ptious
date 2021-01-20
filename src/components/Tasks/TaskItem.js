import React, { useState } from 'react';
// import { taskStatus } from '../../helpers/taskStatus';

import { Modal, Button } from 'react-bootstrap';

export default function TaskItem(props) {
  const [show, setShow] = useState(false);
  const [desc, setDesc] = useState(props.description);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <>
      <li
        onClick={() => props.setTaskItem(props), handleShow}
      >
        <h4>{props.title}</h4>
        <p>{props.description}</p>
        <h6>Assigned on: {props.due_date}</h6>
      </li>
      {props.role === 1 && 
        <form
          onSubmit={event => event.preventDefault()}
        >
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{props.title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <input
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
            type="text"
            />
            </Modal.Body>
            <Modal.Body>
              <p>db id: {props.id}</p>
              <p>Assigned to: {props.assignedTo}</p>
              <p>On: {props.due_date}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Delete
              </Button>
              <Button confirm variant="primary" onClick={() => props.editTaskItem(props.id, desc)}>
                Edit
              </Button>
            </Modal.Footer>
          </Modal>
      </form>
      }
    </>

    
  )
  
}