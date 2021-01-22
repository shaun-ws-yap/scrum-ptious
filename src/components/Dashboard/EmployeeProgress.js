import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { taskStatus, lateTaskStatus, teamTaskStatus } from '../../helpers/taskStatus';
import EmployeeProgressItem from './EmployeeProgressItem';

export default function EmployeeProgress(props) {

  // console.log(props.teamTasks);

  /*
  Team of users: Array of objs
  Tasks for the team: Array of objs
  Tasks for the user: Array of objs

  Output:
  EmployeeProgressItem should have have the Bar component with all the tasks statuses
  EmployeeProgress should be mapping all the users in the team, and pass the props to EPI to use
  Func has to be called here.
  */

  console.log(props.teamUsers);
 
//  const firstEmployee = teamTaskStatus(props.teamTasks, props.teamTasks['projecttask_id'], props.teamTasks['employee_id']);
//  const secondEmployee = teamTaskStatus(props.teamTasks, props.teamTasks['projecttask_id'], props.teamTasks['employee_id']);
//  const thirdEmployee = teamTaskStatus(props.teamTasks, props.teamTasks['projecttask_id'], props.teamTasks['employee_id']);

const tmp = props.teamUsers.map((user) => {
  const tmp2 = teamTaskStatus(props.teamTasks, user.team_id, user.id);

  return (
    <li className="user-in-progress">
      <EmployeeProgressItem
      key={user.id}
      name={user.name}
      assigned={tmp2.assigned}
      inProgress={tmp2.inProgress}
      inReview={tmp2.inReview}
      late={tmp2.late}
      complete={tmp2.complete}
      />
    </li>
  )
})

console.log(tmp);

  return (
    <div className="task-progress">
      {tmp}
    </div>
  )
}

// const allDeadlines = props.deadlines.map((deadline) => {
//   return (
//     <li className="task-in-progress">
//     <DeadlineListItem
//       key={deadline.id}
//       title={deadline.title}
//       description={deadline.description}
//       due_date={deadline.due_date}
//       creation_date={deadline.creation_date}
//     />
//     </li>
//   )
// })

// return (
//   <div className="task-progress">
//     <ul>
//       {allDeadlines}
//     </ul>
//   </div>
// )