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
    moveTask
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
        <Draggable draggableId={task.id + ""} index={index} >
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
    const { destination, source, draggableId, droppableId } = res;

    const task = findTaskItemById(tasks, Number(draggableId));
    console.log(task);
    if (!destination) {
      return;
    }

    if (role === 2 && source.droppableId === "assigned" && destination.droppableId === "inProgress") {
      moveTask(task, 1);
    }
    if (role === 2 && source.droppableId === "inProgress" && destination.droppableId === "assigned") {
      moveTask(task, 0);
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