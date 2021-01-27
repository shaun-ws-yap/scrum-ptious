import React, { useState, useEffect } from 'react';


// import ProjectProgress from './ProjectProgress';
import TaskProgress from './TaskProgress';
import MyTeam from './MyTeam';

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
    setErrorNotification,
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
      <div className="task-dashboard-top">
        <TaskProgress 
          role={role} 
          tasks={selectedTasks} 
          teamUsers={teamUsers} 
          submissions={submissions}
          deleteTaskItem={deleteTaskItem} 
          editTaskItem={editTaskItem}
          submitTaskItem={submitTaskItem}
          error={error}
          setErrorNotification={setErrorNotification}
          moveTask={moveTask}
          setTasks={setTasks}
        />
      </div>
      { role === 1 && 
      <div className="task-dashboard-bottom">
        <div className="my-team-header">My Team</div>
        <div className="team-list-container" id="team-list-filter">
          <MyTeam 
            teamUsers={teamUsers} 
            selectTasksByUser={selectTasksByUser}
          />
        </div>
      </div>}
    </div>
  )
}