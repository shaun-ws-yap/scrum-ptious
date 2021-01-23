import React, { useState } from 'react';

import Feedback from './Feedback';
import TaskList from './TaskList';

export default function PerformanceReview(props) {

  const { teamUsers, teamTasks, setTaskItem, taskItem } = props;
  const [show, setShow] = useState(false);

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <TaskList
          teamUsers={teamUsers}
          teamTasks={teamTasks}
          setTaskItem={setTaskItem}
          taskItem={taskItem}
          setShow={setShow}
        />
      </div>
      <div className="dashboard-bottom">
        <Feedback
          teamUsers={teamUsers}
          taskItem={taskItem}
          show={show}
          setShow={setShow}
        />
      </div>
    </div>
  )
}