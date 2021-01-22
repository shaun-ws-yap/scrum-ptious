import React from 'react';

import TaskItem from './TaskItem';

import sortTasks from '../../helpers/sortTasks';

export default function TaskProgress(props) {
  const {
    role,
    tasks,
    setTaskItem, 
    createTaskItem,
    editTaskItem,
    deleteTaskItem,
  } = props;

  console.log('before sort: ', tasks);

  const sortedTasks = sortTasks(tasks);

  console.log('sorted:', sortedTasks);
  for (const key in sortedTasks) {
    sortedTasks[key] = sortedTasks[key].map(task => {
      return (
        <TaskItem 
          key={task.id}
          taskData={task}
          role={role}
          setTaskItem={setTaskItem}
          createTaskItem={createTaskItem}
          editTaskItem={editTaskItem}
          deleteTaskItem={deleteTaskItem}
        />
      )
    })
  }

  const { assigned, inProgress, completed } = sortedTasks;

  return (
    <div className="task-progress">
      <div className="task-assigned">
        <h1>Assigned</h1>
        {assigned}
      </div>

      <div className="task-in-progress">
        <h1>In-Progress</h1>
        {inProgress}
      </div>

      <div className="task-completed">
        <h1>Completed</h1>
        {completed}
      </div>
    </div>
  )
}