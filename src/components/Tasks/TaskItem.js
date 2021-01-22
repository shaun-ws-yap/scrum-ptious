import React, { useState } from 'react';
// import { taskStatus } from '../../helpers/taskStatus';

import { Modal, Button } from 'react-bootstrap';

export default function TaskItem(props) {
  const {
    role,
    taskData,
    setTaskItem,
    createTaskItem,
    editTaskItem,
    deleteTaskItem,
  } = props;

  const { id, projecttask_id, assignedTo, title, description, due_date } = taskData;

  const [show, setShow] = useState(false);
  const [desc, setDesc] = useState(description);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <li
        onClick={() => setTaskItem(props), handleShow}
      >
        <h4>{title}</h4>
        <p>{description}</p>
        <h6>Assigned on: {due_date}</h6>
      </li>
      {role === 1 && 
        <form
          onSubmit={event => event.preventDefault()}
        >
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <input
            value={desc}
            onChange={(event) => setDesc(event.target.value)}
            type="text"
            />
            </Modal.Body>
            <Modal.Body>
              <p>db id: {id}</p>
              <p>Assigned to: {assignedTo}</p>
              <p>On: {due_date}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => console.log('Delete button pressed')}>
                Delete
              </Button>
              <Button confirm variant="primary" onClick={() => editTaskItem(id, desc)}>
                Edit
              </Button>
            </Modal.Footer>
          </Modal>
      </form>
      }
    </>
  )
  
}