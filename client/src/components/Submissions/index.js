import React, { useState } from 'react';

import Feedback from './Feedback';
import SubmissionList from './SubmissionList';

import '../../styles/Submissions.css';

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
    <div className="submissions-container">
      <h1>Submitted Tasks</h1>
      <div className="submissions">
        <SubmissionList
          teamUsers={teamUsers}
          teamTasks={teamTasks}
          setSelectedTask={setSelectedTask}
          setShow={setShow}
        />
      </div>
      <div>
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