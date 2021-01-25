import React from 'react';

import { Droppable } from 'react-beautiful-dnd';
import TaskItem from './TaskItem';


export default function TaskColumns(props) {
  console.log(props)

  const { title, tasks, data } = props;

  const {
    role,
    editTaskItem,
    deleteTaskItem,
    submitTaskItem,
    teamUsers,
    error,
    setError
  } = data;
  

  console.log(tasks);
  return (
    <div>
      <h1>{title}</h1>
      <Droppable droppableId={title}>
        {(provided, snapshot) => {
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            { tasks.map((task, index) => {
                return (
                  <TaskItem 
                    key={task.id}
                    taskItem={task}
                    role={role}
                    editTaskItem={editTaskItem}
                    deleteTaskItem={deleteTaskItem}
                    submitTaskItem={submitTaskItem}
                    teamUsers={teamUsers}
                    error={error}
                    setError={setError}
                  />
                )
            }) }

            {provided.placeholder}
          </div>
        }}
      </Droppable>
    </div>
  )

}