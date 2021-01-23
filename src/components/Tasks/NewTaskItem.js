import React, { useState } from 'react';

import DatePicker from "react-datepicker";
import { Modal, Button } from 'react-bootstrap';

export default function NewTaskItem(props) {
  const [taskItem, setTaskItem] = useState({
    title: "",
    description: "",
    employee_id: "",
    due_date: new Date(),
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
    if (title === "" || description === "" || employee_id === "" || due_date === undefined) {
      console.log("fields cannot be blank");
      return
    }

    props.createTaskItem(taskItem);
    reset();
    setShow(false);
  }

  return (
    <div>
      <p onClick={() => setShow(true)}>Create New Task</p>

      <form 
        className="form-group"
        onSubmit={event => event.preventDefault()}
      >
        <Modal show={show}  onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>
              <h3>New Task</h3>
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <label for="title">Title: </label>
            <input
              name="title"
              className="form-control"
              value={taskItem.title}
              onChange={(event) => setTaskItem(prev => ({...prev, title: event.target.value}))}
            />

            <label for="description">Description: </label>
            <textarea
              name="description"
              className="form-control"
              value={taskItem.description}
              onChange={(event) => setTaskItem(prev => ({...prev, description: event.target.value}))}
            />

            <label for="assignTo">Assign to: </label>
            <select class="form-control"
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