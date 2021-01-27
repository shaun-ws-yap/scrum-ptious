import React from 'react';

import Moment from 'react-moment';
import { getEmployeeName } from '../../helpers/getEmployeeName';

export default function DeadlineListItem(props) {

  const { title, description, due_date, creation_date, assignedTo, userInfo, teamUsers, is_late } = props;

  return (
    <li className="deadlines-item">
      <h5>{props.title}</h5>
      { userInfo.role === 1 && <p>{getEmployeeName(teamUsers, assignedTo)}</p> } 
      <label for="creation_date">A</label>
      <Moment name="creation_date" format="Do MMM YYYY h:mm A" >{creation_date}</Moment> 
      <br />
      <label for="due_date">D</label>
      <Moment name="due_date" format="Do MMM YYYY h:mm A" >{due_date}</Moment>
      <br />
      { is_late && <span className="badge badge-danger">LATE</span> }
    </li>
  )
  
}