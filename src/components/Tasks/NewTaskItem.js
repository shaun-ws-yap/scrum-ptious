import React, { useState } from 'react';

import DatePicker from "react-datepicker";
import { Modal, Button } from 'react-bootstrap';
import { NotificationContainer, NotificationManager } from 'react-notifications'; 

export default function NewTaskItem(props) {
  const dateNow = new Date();

  const [taskItem, setTaskItem] = useState({
    title: "",
    description: "",
    employee_id: "",
    due_date: dateNow.setDate(dateNow.getDate() + 7),
  });

  const [show, setShow] = useState(false);

  const teamMembersList = props.teamUsers.filter(user => user.role !== 1);

  const handleClose = () => setShow(false);

  function reset() {
    setTaskItem({
      title: "",
      description: "",
      employee_id: "",
      due_date: new Date(), 
    })
  }

  const getUserNameById = (id) => {
    return props.teamUsers.filter(user => user.id === id)[0].name;
  }

  function validate() {
    const { title, description, employee_id, due_date } = taskItem;

    if (title === "") {
      NotificationManager.warning('Title must be valid', 'Error');
      document.getElementById("new-task-title").focus();
      return;
    }
    if (description === "") {
      NotificationManager.warning('Description must be valid', 'Error');
      document.getElementById("new-task-description").focus();
      return;
    }
    if (employee_id === "") {
      NotificationManager.warning('Employee assigned must be valid', 'Error');
      document.getElementById("new-task-assign").focus();
      return;
    }
    if (due_date < new Date()) {
      NotificationManager.warning('Due date cannot be in the past', 'Error');
      document.getElementById("new-task-date").focus();
      return;
    }

    props.createTaskItem(taskItem)
    console.log("success");
    NotificationManager.success(`${taskItem.title}, assigned to ${getUserNameById(taskItem.employee_id)}`, 'Created');
    reset();
    setShow(false);
  }

  return (
    <div>
      <p onClick={() => setShow(true)}>Create New Task</p>

      <NotificationContainer />
      <form 
        className="form-group"
        onSubmit={event => event.preventDefault()}
      >
        <Modal show={show} onHide={handleClose} onEntered={() => document.getElementById("new-task-title").focus()} >
          <Modal.Header closeButton>
            <Modal.Title>
              <h3>New Task</h3>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <label for="title">Title: </label>
            <input
              id="new-task-title"
              name="title"
              className="form-control"
              value={taskItem.title}
              onChange={(event) => setTaskItem(prev => ({...prev, title: event.target.value}))}
            />

            <label for="description">Description: </label>
            <textarea
              id="new-task-description"
              name="description"
              className="form-control"
              value={taskItem.description}
              onChange={(event) => setTaskItem(prev => ({...prev, description: event.target.value}))}
            />

            <label for="assignTo">Assign to: </label>
            <select class="form-control"
              id="new-task-assign"
              onChange={event => setTaskItem(prevTaskItem => ({...prevTaskItem, employee_id: Number(event.target.value)}))}
            >
              <option selected value={""}></option>
              { teamMembersList.map(member => {
                return (
                  <option value={member.id}>{member.name}</option>
                )
              })  }
            </select>

            <label for ="due-date">Due on: </label>
            <DatePicker 
              id="new-task-date"
              className="form-control" 
              selected={new Date(taskItem.due_date)} 
              showTimeSelect
              onChange={date => setTaskItem(prevTaskItem => ({...prevTaskItem, due_date: date}))}
            />

          </Modal.Body>

          <Modal.Footer>
            <Button 
              variant="primary"
              onClick={event => (validate())}
            >
              Submit
            </Button>
          </Modal.Footer>
        </Modal>
      </form>
    </div>

  )
}