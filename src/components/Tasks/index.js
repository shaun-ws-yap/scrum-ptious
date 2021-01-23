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
    setTaskItem,
    createTaskItem,
    editTaskItem,
    deleteTaskItem,
  } = props;

  const [selectedTasks, setSelectedTasks] = useState(tasks);

  useEffect(() => {
    setSelectedTasks(tasks);
  }, [tasks])

  const selectTasks = (user) => {
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
          setTaskItem={setTaskItem} 
          createTaskItem={createTaskItem} 
          deleteTaskItem={deleteTaskItem} 
          editTaskItem={editTaskItem}
        />
      </div>
      <div className="dashboard-bottom">
        { role === 1 && 
          <MyTeam 
            teamUsers={teamUsers} 
            selectTasks={selectTasks}
          />}
        { role === 2 && <TaskResource />}
      </div>
    </div>
  )
}