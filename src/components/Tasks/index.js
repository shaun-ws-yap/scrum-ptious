import React, { useState, useEffect } from 'react';


// import ProjectProgress from './ProjectProgress';
import TaskProgress from './TaskProgress';
import MyTeam from './MyTeam';
import TaskResource from './TaskResource';

import filterTasksByUser from '../../helpers/filterTasksByUser';

export default function Tasks(props) {
  const {
    role,
    tasks,
    teamUsers,
    editTaskItem,
    deleteTaskItem,
    submitTaskItem,
    error,
    setError,
    moveToInProgress
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
          deleteTaskItem={deleteTaskItem} 
          editTaskItem={editTaskItem}
          submitTaskItem={submitTaskItem}
          error={error}
          setError={setError}
          moveToInProgress={moveToInProgress}
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