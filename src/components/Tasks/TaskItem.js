import React, { useState } from 'react';
import { changeTaskStatus } from '../../helpers/taskStatus';
import classNames from 'classnames';

import { Modal, Button } from 'react-bootstrap';
import Moment from 'react-moment';
import 'moment-timezone'
import { NotificationContainer } from 'react-notifications'; 

import ManagerModal from './ManagerModal';
import EmployeeModal from './EmployeeModal';

// import { formatDateString } from './utilities/format-date';

export default function TaskItem(props) {
  const {
    role,
    taskItem,
    submissions,
    editTaskItem,
    deleteTaskItem,
    submitTaskItem,
    teamUsers,
    error,
    setError
  } = props;
  
  const { 
    title, 
    description, 
    due_date, 
    creation_date, 
    status, 
    is_late
  } = taskItem;
  
  const [show, setShow] = useState(false);
  
  const taskClass = classNames("task__item", {
    'task__item--assigned' : is_late === false && status === 0,
    'task__item--in-progress' : is_late === false && status === 1,
    'task__item--in-review' : is_late === false && status === 2,
    'task__item--in-review-late': is_late === true && status === 2,
    'task__item--complete' : status === 3
  });

  /**
   *  could store all these fn into a helper file
   * */
  const handleClose = () => setShow(false);

  return (
    <>
      <NotificationContainer />
      <li className={taskClass}
        onClick={event => setShow(true)}
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

      <form
        onSubmit={event => event.preventDefault()}
        className="form-group"
      >
        { role === 1 &&
          <ManagerModal 
            teamUsers={teamUsers}
            taskItem={taskItem}
            show={show}
            handleClose={handleClose}
            editTaskItem={editTaskItem}
            deleteTaskItem={deleteTaskItem}
            error={error}
            setError={setError}
          />
        }
        {role === 2 &&
          <EmployeeModal
            show={show}
            taskItem={taskItem}
            teamUsers={teamUsers}
            submissions={submissions}
            handleClose={handleClose}
            submitTaskItem={submitTaskItem}
          />
        }
      </form>
    </>
  )
}