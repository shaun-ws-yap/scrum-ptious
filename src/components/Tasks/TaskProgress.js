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
    setTasks
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
    const { destination, source, draggableId, droppableId } = res;

    const task = findTaskItemById(tasks, Number(draggableId));
    if (!destination) {
      return;
    }

    if (role === 2 && source.droppableId === "assigned" && destination.droppableId === "inProgress") {
      console.log(task);
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
        <div key="assigned" className="task-assigned">
          <h1>Assigned</h1>
          <Droppable droppableId="assigned">
            {(provided, snapshot) => (
              <div 
                key="assigned"
                index="1"
                ref={provided.innerRef} 
                style={{backgroundColor: snapshot.isDraggingOver ? 'lightblue' : ''}}
                {...provided.droppableProps}
              >
                { assigned }
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>

        <div key="inProgress" className="task-inprogress">
          <h1>In-Progress</h1>
          <div className="task-droppable-inprogress">
            <Droppable droppableId="inProgress">
              {(provided, snapshot) => (
                <div 
                  key="inProgress"
                  index="2"
                  ref={provided.innerRef} 
                  {...provided.droppableProps}
                >
                  { inProgress }
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>

        { role === 1 && (
          <div key="trash" className={trashVisible ? "trash--visible" : "trash--hidden"} >
            <Droppable droppableId="trash">
              {(provided, snapshot) => (
                <div
                  key="trash"
                  index="3"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <h1>Delete</h1>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )} 
      </DragDropContext>

      <div className="task-completed">
        <h1>Completed</h1>
        { completed }
      </div>
    </div>
  )
}