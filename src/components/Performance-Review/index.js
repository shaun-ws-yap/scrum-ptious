import React from 'react';

import Feedback from './Feedback';
import TaskList from './TaskList';

export default function PerformanceReview(props) {

  const { teamUsers, teamTasks, setTaskItem, taskItem } = props;

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <Feedback
        teamUsers={teamUsers}
        taskItem={taskItem}
        />
      </div>
      <div className="dashboard-bottom">
        <TaskList
          teamUsers={teamUsers}
          teamTasks={teamTasks}
          setTaskItem={setTaskItem}
          taskItem={taskItem}
        />
      </div>
    </div>
  )
}