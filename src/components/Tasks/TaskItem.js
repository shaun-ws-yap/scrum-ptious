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
        <h2>{props.title}</h2>
        <h3>{props.description}</h3>
        <h4>Assigned on: {props.due_date}</h4>
      </li>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <textarea
        value={desc}
        onChange={(event) => setDesc(event.target.value)}
        />
        </Modal.Body>
        <Modal.Body>Assigned on: {props.due_date}</Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleClose}>
            Delete
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>

    
  )
  
}