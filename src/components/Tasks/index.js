import React, { useState, useEffect } from 'react';


// import ProjectProgress from './ProjectProgress';
import TaskProgress from './TaskProgress';
import MyTeam from './MyTeam';
import TaskResource from './TaskResource';

import filterTasksByUser from '../../helpers/filterTasksByUser';

import '../../styles/Tasks.css';

export default function Tasks(props) {
  const {
    role,
    tasks,
    teamUsers,
    submissions,
    editTaskItem,
    deleteTaskItem,
    submitTaskItem,
    error,
    setError,
    moveTask,
    setTasks
  } = props;

  const [selectedTasks, setSelectedTasks] = useState(tasks);

  useEffect(() => {
    setSelectedTasks(tasks);
  }, [tasks])

  const selectTasksByUser = (user) => {
    if (user.role === 1) {
      setSelectedTasks(tasks);
      return;
    }
    const userTasks = filterTasksByUser(user.id, tasks);
    setSelectedTasks(userTasks);
  }

  return (
    <div className='dashboard'>
      <div className="dashboard-top">
        <TaskProgress 
          role={role} 
          tasks={selectedTasks} 
          teamUsers={teamUsers} 
          submissions={submissions}
          deleteTaskItem={deleteTaskItem} 
          editTaskItem={editTaskItem}
          submitTaskItem={submitTaskItem}
          error={error}
          setError={setError}
          moveTask={moveTask}
          setTasks={setTasks}
        />
      </div>
      <div className="dashboard-bottom">
        { role === 1 && 
          <MyTeam 
            teamUsers={teamUsers} 
            selectTasksByUser={selectTasksByUser}
          />}
        { role === 2 && <TaskResource />}
      </div>
    </div>
  )
}