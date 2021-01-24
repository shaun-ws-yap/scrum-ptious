import React from 'react';

import TaskItem from './TaskItem';

import sortTasks from '../../helpers/sortTasks';

export default function TaskProgress(props) {
  const {
    role,
    tasks,
    editTaskItem,
    deleteTaskItem,
    submitTaskItem,
    teamUsers
  } = props;

  const sortedTasks = sortTasks(tasks);

  for (const key in sortedTasks) {
    sortedTasks[key] = sortedTasks[key].map(task => {
      return (
        <TaskItem 
          key={task.id}
          taskItem={task}
          role={role}
          editTaskItem={editTaskItem}
          deleteTaskItem={deleteTaskItem}
          submitTaskItem={submitTaskItem}
          teamUsers={teamUsers}
        />
      )
    })
  }

  const { assigned, inProgress, completed } = sortedTasks;

  return (
    <div className="task-progress">
      <div>
        <h1>Assigned</h1>
        {assigned}
      </div>

      <div>
        <h1>In-Progress</h1>
        {inProgress}
      </div>

      <div>
        <h1>Completed</h1>
        {completed}
      </div>
    </div>
  )
}