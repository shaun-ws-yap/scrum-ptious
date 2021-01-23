import React, { useState } from 'react';
import { changeTaskStatus } from '../../helpers/taskStatus';
import classNames from 'classnames';

import { Modal, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Moment from 'react-moment';
import 'moment-timezone'
import { NotificationContainer, NotificationManager } from 'react-notifications'; 

// import { formatDateString } from './utilities/format-date';

export default function TaskItem(props) {
  const {
    role,
    taskData,
    setTaskItem,
    editTaskItem,
    deleteTaskItem,
    teamUsers
  } = props;

  const [show, setShow] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [newTaskData, setNewTaskData] = useState(taskData);
  
  const { id, projecttask_id, employee_id, title, description, due_date, creation_date, status, is_late } = taskData;

  const taskClass = classNames("task__item", {
    'task__item--assigned' : is_late === false && status === 0,
    'task__item--in-progress' : is_late === false && status === 1,
    'task__item--in-review' : is_late === false && status === 2,
    'task__item--complete' : is_late === false && status === 3
  });

  /**
   *  could store all these fn into a helper file
   * */
  const handleShow = (props) => {
    setTaskItem(props);
    setShow(true);
  }

  const handleDelete = () => {
    console.log(taskData);
    deleteTaskItem(taskData);
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

  function reset() {

  }

  function validate() {

    if (newTaskData.title === "") {
      NotificationManager.error('Title must be valid', 'Error');
      return;
    }
    if (newTaskData.description === "") {
      NotificationManager.error('Description must be valid', 'Error');
      return;
    }
    if (newTaskData.employee_id === "") {
      NotificationManager.error('Employee assigned must be valid', 'Error');
      return;
    }
    if (newTaskData.due_date < new Date()) {
      NotificationManager.error('Due date cannot be in the past', 'Error');
      return;
    }
    console.log(newTaskData);
    editTaskItem(newTaskData)
    NotificationManager.success(`${newTaskData.title}`, 'Updated');
    reset();
    setShow(false);
  }

  return (
    <>
      <NotificationContainer />
      <li className={taskClass}
        onClick={event => handleShow(props)}
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
      {role === 1 && status !== 3 &&
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
              <Button variant="danger" onClick={() => handleDelete()}>
                Delete
              </Button>
              { editMode && 
                  <Button confirm variant="success" onClick={() => validate()}>
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
              {description}
            </Modal.Body>
            <Modal.Body>
              <p>Assigned to: {getUserNameById(employee_id)}</p>
              <label for="viewMode-due_date">Due on: </label>
              <Moment name="viewMode-due_date" local format="Do MMM YYYY h:mm A" >{due_date}</Moment> 
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