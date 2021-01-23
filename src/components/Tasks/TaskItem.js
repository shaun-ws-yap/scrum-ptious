import React, { useState } from 'react';
import { changeTaskStatus } from '../../helpers/taskStatus';

import { Modal, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Moment from 'react-moment';
import 'moment-timezone'

// import { formatDateString } from './utilities/format-date';

export default function TaskItem(props) {
  const {
    role,
    taskData,
    setTaskItem,
    createTaskItem,
    editTaskItem,
    deleteTaskItem,
    teamUsers
  } = props;

  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newTaskData, setNewTaskData] = useState(taskData);
  
  const { id, projecttask_id, employee_id, title, description, due_date, creation_date } = taskData;

  /**
   *  could store all these fn into a helper file
   * */

   const UTC = 'UTC';

  const handleShow = (props) => {
    setTaskItem(props);
    setShow(true);
  }

  const handleDelete = (id) => {
    deleteTaskItem(id);
    setShow(false)
  };

  const handleClose = () => setShow(false);

  const handleEditToggle = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  }

  const assignNewUserList = teamUsers.filter(user => user.id !== employee_id && user.role !== 1);

  const onDateChange = (date) => {
    const tmp = new Date(date).toISOString();
    setNewTaskData(prev => ({...prev, due_date: tmp}));
  }

  const getUserNameById = (id) => {
    return teamUsers.filter(user => user.id === id)[0].name;
  }

  const handleEdit = (newTaskData) => {
    editTaskItem(newTaskData);
    setShow(false);
  }

  return (
    <>
      <li
        onClick={() => handleShow(props)}
      >
        <h4>{title}</h4>
        <p>{description}</p>
        <label for="creation_date">Assigned on:</label>
        <br />
        <Moment format="Do MMM YYYY h:mm A" >{creation_date}</Moment> 
        <br />
        <label for="due_date">Due on:</label>
        <br />
        <Moment format="Do MMM YYYY h:mm A" >{due_date}</Moment> 
        <br />
      </li>
      {role === 1 && 
        <form
          onSubmit={event => event.preventDefault()}
          className="form-group"
        >
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
                { editMode ? newTaskData.title : title }
                <Button 
                  onClick={() => handleEditToggle()}
                  variant="warning"
                > 
                  { editMode ? <>Cancel</> : <>Edit</> } 
                </Button>
                </Modal.Title>
            </Modal.Header>

            <Modal.Body>
              { !editMode && (
                <>
                  <p>{description}</p>
                  <p>Assigned to: { getUserNameById(employee_id) }</p>
                  <label for="viewMode-due_date">Due on: </label>
                  <Moment name="viewMode-due_date" local format="Do MMM YYYY h:mm A" >{due_date}</Moment> 
                </>
              ) }

              { editMode && (
                <>
                  <label for="newTitle">Title: </label>
                  <input
                    className="form-control"
                    value={newTaskData.title}
                    onChange={(event) => setNewTaskData(prev => ({...prev, title: event.target.value}))}
                  />
                  <label for="newDescription">Description: </label>
                  <textarea
                    value={newTaskData.description}
                    onChange={(event) => setNewTaskData(prev => ({...prev, description: event.target.value}))}
                    type="text"
                    className="form-control"
                    name="newDescription"
                  />
                  <label for="assigned">Re-assign to:</label>
                  <select
                    name="assigned"
                    className="form-control"
                    onChange={(event) => setNewTaskData(prev => ({...prev, employee_id: event.target.value}))}
                  >
                    <option selected value={employee_id}>{getUserNameById(employee_id)}</option>
                    { assignNewUserList.map(item => {
                      return (
                        <option value={item.id}>{item.name}</option>
                      )
                    }) }
                  </select>
                  <label for="due_date">Due date:</label>
                  <DatePicker 
                    className="form-control" 
                    locale="en-US"
                    selected={new Date(newTaskData.due_date)} 
                    showTimeInput
                    onChange={(date) => onDateChange(date)}
                    dateFormat="MMMM d, yyyy h:mm aa"

                  />
                </>
              ) }
              
            </Modal.Body>
            <Modal.Footer>
              <Button variant="danger" onClick={() => handleDelete(id)}>
                Delete
              </Button>
              { editMode && 
                  <Button confirm variant="success" onClick={() => handleEdit(newTaskData)}>
                    Save
                  </Button> 
              }
            </Modal.Footer>
          </Modal>
      </form>
      }
      {role === 2 && (taskData.status === 0 || taskData.status === 1) &&
        <form
          onSubmit={event => event.preventDefault()}
        >
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {desc}
            </Modal.Body>
            <Modal.Body>
              <p>db id: {id}</p>
              <p>Assigned to: {assignedTo}</p>
              <p>On: {due_date}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button confirm variant="primary" onClick={() => props.setTaskItem(taskData.status += 1)}>
                Submit
              </Button>
            </Modal.Footer>
          </Modal>
      </form>
      }
    </>
  )
  
}