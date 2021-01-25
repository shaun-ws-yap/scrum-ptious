import React, { useState, useEffect } from 'react';

import TaskItem from './TaskItem';
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
  const [trashVisible, setTrashVisible] = useState(false);

  useEffect(()=> {
    const updated = sortTasks(tasks);
    setSortedTasks(updated);
  }, [tasks])

  const sortedComponents = {};

  for (const key in sortedTasks) {
    sortedComponents[key] = sortedTasks[key].map((task, index) => {
      const draggable = task.status === 3 || task.status === 2 ? true : false;
      
      if (task.status !== 3) {
        return (
          <Draggable draggableId={task.id + ""} index={index} isDragDisabled={draggable} >
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
      } else {
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
      }
      
    })
  }

  const { assigned, inProgress, completed } = sortedComponents;

  const onDragEnd = (res) => {
    setTrashVisible(false);
    const { destination, source, draggableId, droppableId } = res;

    const task = findTaskItemById(tasks, Number(draggableId));
    if (!destination) {
      return;
    }

    if (role === 2 && source.droppableId === "assigned" && destination.droppableId === "inProgress") {
      moveTask(task, 1);
    }
    if (role === 2 && source.droppableId === "inProgress" && destination.droppableId === "assigned") {
      moveTask(task, 0);
    }

    if (role === 1 && destination.droppableId === "trash") {
      deleteTaskItem(task);
    }
    
  }

  const onBeforeCapture = () => {
    setTrashVisible(true);
  }

  return (
    <div className="task-progress">
      <DragDropContext
        onDragEnd={onDragEnd}
        onBeforeCapture={onBeforeCapture}
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

        { role === 1 && (
          <div key="trash" className={trashVisible ? "trash--visible" : "trash--hidden"} >
            <Droppable droppableId="trash">
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <h1>Delete</h1>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )} 
      </DragDropContext>

      <div>
        <h1>Completed</h1>
        { completed }
      </div>
    </div>
  )
}