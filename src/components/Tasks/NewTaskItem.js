import React, { useState } from 'react';

import DatePicker from "react-datepicker";

export default function NewTaskItem(props) {
  const [taskItem, setTaskItem] = useState({
    title: "",
    description: "",
    employee_id: "",
    due_date: new Date(),
  });

  const teamMembersList = props.team.map(member => {
    return (
      <option value={member.id}>{member.name}</option>
    )
  })

  function reset() {
    setTaskItem({
      title: "",
      description: "",
      employee_id: "",
      due_date: new Date(), 
    })
  }

  function validate() {
    const { title, description, employee_id, due_date } = taskItem;
    if (title === "" || description === "" || employee_id === "" || due_date === undefined) {
      console.log("fields cannot be blank");
      return
    }

    props.createTaskItem(taskItem);
    reset();
  }

  return (
    <div>

      <form 
        className="form-group"
        onSubmit={event => event.preventDefault()}
      >
        <p>Create New Task</p>
        <label for="title">Title:</label>
        <input 
          className="form-control"
          name="title"
          type="text"
          value={taskItem.title}
          onChange={event => setTaskItem(prevTaskItem => ({...prevTaskItem, title: event.target.value}))}
        />
        <label for="description">Description:</label>
        <textarea
          className="form-control"
          name="description"
          type="text"
          value={taskItem.description}
          onChange={event => setTaskItem(prevTaskItem => ({...prevTaskItem, description: event.target.value}))}
        />
        <label for ="employee">Assign to: </label>
        <select class="form-control"
          onChange={event => setTaskItem(prevTaskItem => ({...prevTaskItem, employee_id: Number(event.target.value)}))}
        >
          <option value={taskItem.employee_id} selected></option> 
          {teamMembersList}
        </select>
        <label for ="due-date">Due on: </label>
        <DatePicker 
          className="form-control" 
          selected={taskItem.due_date} 
          showTimeSelect
          onChange={date => setTaskItem(prevTaskItem => ({...prevTaskItem, due_date: date}))}
        />
        <button 
          className="btn btn-primary"
          onClick={event => (validate())}
        >
          Submit
        </button>
      </form>
    </div>

  )
}