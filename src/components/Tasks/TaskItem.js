import React, { useState } from 'react';
import { changeTaskStatus } from '../../helpers/taskStatus';
import getUserNameById from '../../helpers/getUserNameById';
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
    is_late,
    employee_id
  } = taskItem;
  
  const [show, setShow] = useState(false);
  
  const taskClass = classNames("task__item", {
    'task__item--assigned' : !is_late && status === 0,
    'task__item--in-progress' : !is_late && status === 1,
    'task__item--in-review' : !is_late && status === 2,
    'task__item--in-review-late': is_late && status === 2,
    'task__item--late': is_late && status !== 2 && status !== 3,
    'task__item--complete' : status === 3
  });

  /**
   *  could store all these fn into a helper file
   * */
  const handleClose = () => setShow(false);

  return (
    <>
      <div className={taskClass}
        onClick={event => setShow(true)}
      >
        <h5 className="task-item-title">{title}</h5>
        <p className="task-item-name'">{getUserNameById(teamUsers, employee_id)}</p>
        <p className="task-item-description">{description}</p>
        {/* { is_late && <span className="badge badge-danger task-item-badge">LATE</span> } */}
        <div className="task-item-dates">
          <div className="card-date">
            <label for="creation_date">On: </label>
            <Moment name="creation_date" format="Do MMM YYYY h:mm A" >{creation_date}</Moment> 
          </div>
          <div className="tas-item-card-date">
            <label for="due_date">Due:</label>
            <Moment name="due_date" format="Do MMM YYYY h:mm A" >{due_date}</Moment>
          </div>
        </div>
        <div className="task-item-badge-container">
          <div className="task-item-badge">
            { status === 0 && <i class="fas fa-people-arrows"></i> }
            { status === 1 && <i class="fas fa-spinner"></i> }
          </div>
        </div>
      </div>

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