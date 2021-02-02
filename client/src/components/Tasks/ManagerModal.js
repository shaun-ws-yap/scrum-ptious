import React, { useState } from 'react';

import { Modal, Button } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import Moment from 'react-moment';
import 'moment-timezone';
import { NotificationManager } from 'react-notifications'; 
import getTaskStatus from '../../helpers/getTaskStatus';

export default function ManagerModal(props) {
  const {
    teamUsers,
    taskItem,
    show,
    handleClose,
    editTaskItem,
    deleteTaskItem,
  } = props;

  const { 
    employee_id, 
    title, 
    description, 
    due_date,
    status,
    is_late
  } = taskItem;

  const [editMode, setEditMode] = useState(false);
  const [newTaskData, setNewTaskData] = useState(taskItem);
  const taskInfo = getTaskStatus(status);

  function reset() {
    setEditMode(false);
  }

  const handleDelete = () => {
    deleteTaskItem(taskItem);
    handleClose();
  };

  const handleEditToggle = () => {
    editMode ? setEditMode(false) : setEditMode(true);
  }

  const assignNewUserList = teamUsers.filter(user => user.id !== employee_id && user.role !== 1);

  const onDateChange = (date) => {
    const tmp = new Date(date).toISOString();
    setNewTaskData(prev => ({...prev, due_date: tmp}));
  }

  const getUserNameById = (id) => {
    return teamUsers.find(user => user.id === id).name;
  }

  function validate() {

    if (newTaskData.title === "") {
      NotificationManager.warning('Title must be valid', 'Error');
      return;
    }
    if (newTaskData.description === "") {
      NotificationManager.warning('Description must be valid', 'Error');
      document.getElementById("edit-task-description").focus();
      return;
    }
    if (newTaskData.employee_id === "") {
      NotificationManager.warning('Employee assigned must be valid', 'Error');
      document.getElementById("edit-task-assign").focus();
      return;
    }
    if (newTaskData.due_date < new Date()) {
      NotificationManager.warning('Due date cannot be in the past', 'Error');
      document.getElementById("edit-task-date").focus();
      return;
    }

    editTaskItem(newTaskData)
    reset();
    handleClose();
    
  }

  return (
    <Modal show={show} onHide={handleClose} >
      <Modal.Header closeButton>
        <Modal.Title>
          { editMode ? newTaskData.title : title }
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        { !editMode && (
          <>
            <p>{description}</p>
            <p>Assigned to: { getUserNameById(employee_id) }</p>
            <label>Due on: </label>
            <Moment name="viewMode-due_date" local format="Do MMM YYYY h:mm A" >{due_date}</Moment> 
          </>
        )}

        { editMode && (
          <>
            <label>Title: </label>
            <input
              autofocus
              className="form-control edit-task-title"
              value={newTaskData.title}
              onChange={(event) => setNewTaskData(prev => ({...prev, title: event.target.value}))}
            />
            <label>Description: </label>
            <textarea
              id="edit-task-description"
              value={newTaskData.description}
              onChange={(event) => setNewTaskData(prev => ({...prev, description: event.target.value}))}
              type="text"
              className="form-control"
              name="newDescription"
            />
            <label>Re-assign to:</label>
            <select
              id="edit-task-assign"
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
            <label>Due date:</label>
            <DatePicker 
              id="edit-task-date"
              className="form-control" 
              locale="en-US"
              selected={new Date(newTaskData.due_date)} 
              showTimeInput
              onChange={(date) => onDateChange(date)}
              dateFormat="MMMM d, yyyy h:mm aa"

            />
          </>
        )}
        
      </Modal.Body>
      <Modal.Footer>
          { status !== 3 && (
            <Button 
              onClick={() => handleEditToggle()}
              variant="warning"
            > 
              { editMode ? <>Cancel</> : <>Edit</> } 
            </Button>
          )}
        { status !== 3 && <Button variant="danger" onClick={() => handleDelete()}>
          Delete
        </Button>
        }
        
        { editMode && 
          <Button confirm variant="success" onClick={() => validate()}>
            Save
          </Button> 
        }
        { !editMode && status === 3 && <span className={`badge badge-${taskInfo.type}`}>{taskInfo.status}</span> } 
        { status === 3 && is_late && <span className="badge badge-danger">Late</span> }
      </Modal.Footer>
    </Modal>
  )
}

