import React from 'react';

import TaskListItem from './TaskListItem';
import { getEmployeeName } from '../../helpers/getEmployeeName';

export default function TaskList(props) {

  const { teamUsers, teamTasks, setTaskItem } = props;

  const listedTeamTasks = teamTasks.map((task) => {
    return (
      task.status === 3 &&
      <li className="task-in-progress">
        <TaskListItem
          key={task.id}
          title={task.title}
          description={task.description}
          name={getEmployeeName(teamUsers, task.employee_id)}
          is_late={task.is_late}
          is_viewed={task.is_viewed}
          taskData={task}
          setTaskItem={setTaskItem}
        />
      </li>
    )
  })

  return (
    <div className="task-progress">
      <ul>
        {listedTeamTasks}
      </ul>
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
