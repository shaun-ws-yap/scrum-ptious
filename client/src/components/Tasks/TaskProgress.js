import React, { useState, useEffect } from 'react';

import TaskItem from './TaskItem';
import sortTasks from '../../helpers/sortTasks';
import findTaskItemById from '../../helpers/findTaskItemById';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function TaskProgress(props) {
  const {
    role,
    tasks,
    submissions,
    editTaskItem,
    deleteTaskItem,
    submitTaskItem,
    teamUsers,
    error,
    setErrorNotification,
    moveTask,
  } = props;

  // local states

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
          <Draggable key={task.id} draggableId={"" + task.id} index={index} isDragDisabled={draggable} >
            {(provided, snapshot) => (
              <div 
                key={task.id}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <TaskItem 
                  key={task.id}
                  taskItem={task}
                  role={role}
                  submissions={submissions}
                  editTaskItem={editTaskItem}
                  deleteTaskItem={deleteTaskItem}
                  submitTaskItem={submitTaskItem}
                  teamUsers={teamUsers}
                  error={error}
                  setErrorNotification={setErrorNotification}
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
            submissions={submissions}
            editTaskItem={editTaskItem}
            deleteTaskItem={deleteTaskItem}
            submitTaskItem={submitTaskItem}
            teamUsers={teamUsers}
            error={error}
            setErrorNotification={setErrorNotification}
          />
        )
      }
    })
  }

  const { assigned, inProgress, completed } = sortedComponents;

  const onDragEnd = (res) => {
    setTrashVisible(false);
    const { destination, source, draggableId } = res;

    const task = findTaskItemById(tasks, Number(draggableId));
    if (!destination) {
      return;
    }

    if (role !== 1 && source.droppableId === "assigned" && destination.droppableId === "inProgress") {
      moveTask(task, 1);
          }
    if (role !== 1 && source.droppableId === "inProgress" && destination.droppableId === "assigned") {
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

        <div key="assigned" className="task-progress-container-assigned">
          <h1>Assigned</h1>
          <Droppable key="assigned" droppableId="assigned">
            {(provided, snapshot) => (
              <div 
                className="task-column task-assigned"
                key="assigned"
                index="1"
                ref={provided.innerRef} 
                style={{backgroundColor: snapshot.isDraggingOver ? 'rgba(61, 173, 209, 0.5)' : 'rgba(61, 173, 209, 0.25)'}}
                {...provided.droppableProps}
              >
                { assigned }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
        

        <div key="inProgress" className="task-progress-container-inprogress">
          <h1>In-Progress</h1>
          <Droppable key="inProgress" droppableId="inProgress">
            {(provided, snapshot) => (
              <div 
                className="task-column task-inprogress"
                key="inProgress"
                index="2"
                ref={provided.innerRef} 
                {...provided.droppableProps}
                style={{backgroundColor: snapshot.isDraggingOver ? 'rgba(92, 92, 183, 0.5)' : 'rgba(92, 92, 183, 0.25)'}}
              {...provided.droppableProps}
              >
                { inProgress }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        { role === 1 && (
          <div key="trash" className={trashVisible ? "trash--visible" : "trash--hidden"} >
            <Droppable key="trash" droppableId="trash">
              {(provided, snapshot) => (
                <div
                  key="trash"
                  index="3"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <span className="trash-icon"><i className="far fa-trash-alt fa-3x"></i></span>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )} 
      </DragDropContext>

      <div className="task-progress-container-completed">
        <h1>Completed</h1>
        <div className="task-column task-completed">
          { completed }
        </div>
      </div>
    </div>
  )
}