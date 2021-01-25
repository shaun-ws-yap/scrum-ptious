import React, { useState } from 'react';

import Feedback from './Feedback';
import SubmissionList from './SubmissionList';

export default function Submissions(props) {

  const { 
    teamUsers, 
    teamTasks, 
    giveFeedback,
    setUserNotification,
    user
  } = props;
  
  const [selectedTask, setSelectedTask] = useState({});
  const [show, setShow] = useState(false);

  return (
    <div className="dashboard">
      <div className="dashboard-top">
        <SubmissionList
          teamUsers={teamUsers}
          teamTasks={teamTasks}
          setSelectedTask={setSelectedTask}
          setShow={setShow}
        />
      </div>
      <div className="dashboard-bottom">
        <Feedback
          teamUsers={teamUsers}
          selectedTask={selectedTask}
          show={show}
          setShow={setShow}
          giveFeedback={giveFeedback}
          setUserNotification={setUserNotification}
          user={user}
        />
      </div>
    </div>
  )
}