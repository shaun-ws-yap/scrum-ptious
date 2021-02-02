import React from 'react';

import Moment from 'react-moment';
import 'moment-timezone';

export default function FeedbackList(props) {
  const {
    taskId,
    feedbacks,
  } = props;

  const filterFeedbackByTask = (tid, feedbacks) => {
    const tmp = [...feedbacks];

    const PENDING = "pending";
    return tmp.reverse().filter(feedback => {
      return feedback.task_id === tid && feedback.status !== PENDING; 
    })
  };

  const feedbackItems = filterFeedbackByTask(taskId, feedbacks)
    .map(feedback => {
      return (
        <div key={feedback.id}>
          <p>{feedback.feedback_string}</p>
          <label>Submitted on: </label>
          <Moment name="viewMode-due_date" local format="Do MMM YYYY h:mm A" >{feedback.submission_date}</Moment>
          <p>{feedback.status}</p> 
        </div>
      )
    })

  return (
    <div>
      {feedbackItems}
    </div>
  )
}
