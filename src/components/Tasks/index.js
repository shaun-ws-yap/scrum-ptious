import React, { useState, useEffect } from 'react';


// import ProjectProgress from './ProjectProgress';
import TaskProgress from './TaskProgress';
import MyTeam from './MyTeam';

import filterTasksByUser from '../../helpers/filterTasksByUser';
import styled from 'styled-components';

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
    setTasks,
    theme
  } = props;

  const [selectedTasks, setSelectedTasks] = useState(tasks);

  const TeamHeader = styled.div`
  color: ${props => props.theme.chatBoxFontColor};
  `;

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
        {/* <div className="my-team-header">My Team</div> */}
        <TeamHeader className="my-team-header">My Team</TeamHeader>
        <div className="team-list-container">
          <MyTeam 
            teamUsers={teamUsers} 
            theme={theme}
            selectTasksByUser={selectTasksByUser}
          />
        </div>
      </div>}
    </div>
  )
}