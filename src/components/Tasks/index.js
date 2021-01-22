import React, { useState, useEffect } from 'react';


// import ProjectProgress from './ProjectProgress';
import TaskProgress from './TaskProgress';
import MyTeam from './MyTeam';
import TaskResource from './TaskResource';
// import UserInfo from './UserInfo';

// import '../../styles/Dashboard.css';

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

  const filterTasksByUser = (user) => {
    if (user.role === 1) {
      setSelectedTasks(tasks);
      return;
    }
    const userTasks = tasks.filter(task => task.employee_id === user.id);
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
            filterTasksByUser={filterTasksByUser}  
          />}
        { role === 2 && <TaskResource />}
      </div>
    </div>
  )
}