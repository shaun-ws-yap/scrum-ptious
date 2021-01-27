import React from 'react';

import Moment from 'react-moment';
import { getEmployeeName } from '../../helpers/getEmployeeName';

export default function DeadlineListItem(props) {

  const { title, description, due_date, creation_date, assignedTo, userInfo, teamUsers, is_late, status } = props;

  console.log(status);

  return (
    <div className={`deadline-card-${status === 0 ? 'assigned' : 'inprogress'}`}>

      <h5>{props.title}</h5>
      { userInfo.role === 1 && <p>{getEmployeeName(teamUsers, assignedTo)}</p> }
      <div className="card-date">
        <label for="creation_date">On: </label>
        <Moment name="creation_date" format="Do MMM YYYY h:mm A" >{creation_date}</Moment> 
      </div>
      <div className="card-date">
        <label for="due_date">Due:</label>
        <Moment name="due_date" format="Do MMM YYYY h:mm A" >{due_date}</Moment>
      </div>
      <div className={`deadline-card-badge-container-${status === 0 ? 'assigned' : 'inprogress'}`}>
        
        <div className="deadline-card-badge">
          { status === 0 && <i class="fas fa-people-arrows"></i> }
          { status === 1 && <i class="fas fa-spinner"></i> }
        </div>
      </div>
      { is_late && <span className="badge badge-danger">LATE</span> }
    </div>
  )
  
}