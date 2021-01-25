import React, { useState, useEffect } from 'react';

import TaskItem from './TaskItem';
import TaskColumns from './TaskColumns';
import sortTasks from '../../helpers/sortTasks';
import findTaskItemById from '../../helpers/findTaskItemById';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function TaskProgress(props) {
  const {
    role,
    tasks,
    editTaskItem,
    deleteTaskItem,
    submitTaskItem,
    teamUsers,
    error,
    setError,
    moveToInProgress,
  } = props;

  const [sortedTasks, setSortedTasks] = useState({});

  useEffect(()=> {
    const updated = sortTasks(tasks);
    setSortedTasks(updated);
  }, [tasks])

  const sortedComponents = {};

  for (const key in sortedTasks) {
    sortedComponents[key] = sortedTasks[key].map((task, index) => {
      return (
        <Draggable draggableId={task.id.toString()} index={index} >
          {(provided, snapshot) => (
            <div 
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              ref={provided.innerRef}
              isDragging={snapshot.isDragging}
            >
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
            </div>
          )}
        </Draggable>
      )
    })
  }

  const { assigned, inProgress, completed } = sortedComponents;

  const onDragEnd = (res) => {
    const task = findTaskItemById(tasks, Number(res.draggableId));
    if (role === 2 && res.source.droppableId === "assigned" && res.destination.droppableId === "inProgress") {
      moveToInProgress(...task);
    }
  }

  return (
    <div className="task-progress">
      <DragDropContext
        onDragEnd={onDragEnd}
      >
        <div key="assigned">
          <h1>Assigned</h1>
          <Droppable droppableId="assigned">
            {(provided, snapshot) => (
              <div 
                ref={provided.innerRef} 
                {...provided.droppableProps}
                isDrggingOver={snapshot.isDraggingOver}
              >
                { assigned }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div key="inProgress">
          <h1>In-Progress</h1>
          <Droppable droppableId="inProgress">
            {(provided, snapshot) => (
              <div 
                ref={provided.innerRef} 
                {...provided.droppableProps}
                isDrggingOver={snapshot.isDraggingOver}
              >
                { inProgress }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div key="completed">
          <h1>Completed</h1>
          <Droppable droppableId="completed">
            {(provided, snapshot) => (
              <div 
                ref={provided.innerRef} 
                {...provided.droppableProps}
                isDrggingOver={snapshot.isDraggingOver}
              >
                { completed }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  )
}