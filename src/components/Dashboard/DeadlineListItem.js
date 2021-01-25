import React from 'react';

import Moment from 'react-moment';
import { getEmployeeName } from '../../helpers/getEmployeeName';

export default function DeadlineListItem(props) {

  const { title, description, due_date, creation_date, assignedTo, userInfo, teamUsers } = props;

  return (
    <li>
      <h4>{props.title}</h4>
      { userInfo.role === 1 && <p>Assigned to: {getEmployeeName(teamUsers, assignedTo)}</p> } 
      <label for="creation_date">On:</label>
      <Moment name="creation_date" format="Do MMM YYYY h:mm A" >{creation_date}</Moment> 
      <br />
      <label for="due_date">Due:</label>
      <Moment name="due_date" format="Do MMM YYYY h:mm A" >{due_date}</Moment> 
      <span className="badge badge-danger">LATE</span>
    </li>
  )
  
}