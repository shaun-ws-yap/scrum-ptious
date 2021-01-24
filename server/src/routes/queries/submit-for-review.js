const { getTasksByTeam } = require('./tasks');
const { getAllSubmissions, saveSubmission } = require('./submissions');

const updateTaskStatus = (db, taskId, status) => {
  const queryString = `
    UPDATE tasks
    SET
      status = $2
    WHERE id = $1
    RETURNING *;
  `;
  return db.query(queryString, [taskId, status]);
};

const updateSubmissionById = (db, sid, message, status) => {
  const queryString = `
    UPDATE submissions
    SET 
      feedback_string = $2,
      status = $3
    WHERE id = $1
    RETURNING *
  `;
  return db.query(queryString, [sid, message, status]);
};

const updateStatusAndGetTasks = (db, tid, status) => {
  return updateTaskStatus(db, tid, status)
    .then(data => getTasksByTeam(db, data.rows[0].projecttask_id));
}

// use this for giving feedback
// returns updated submissions and tasks
const saveFeedback = (db, feedbackData) => {
  const { feedback, taskItem } = feedbackData;
  const { id: sid, feedback_string: message, status: subStatus } = feedback;
  const { id: tid, status: tStatus} = taskItem;

  const getUpdatedSubmissions = updateSubmissionById(db, sid, message, subStatus)
    .then(data => getAllSubmissions(db));

  return Promise.all([
    getUpdatedSubmissions,
    updateStatusAndGetTasks(db, tid, tStatus)
  ])
    .then(([submissionsData, teamTasksData]) => {
      return {
        submissions: submissionsData.rows,
        teamTasks: teamTasksData.rows
      };
    });
}

// use this for submitting task
// returns updated tasks and submission
const submitTaskForReview = (db, submitTaskData) => {
  const { submission, taskItem } = submitTaskData;

  const getUpdatedSubmissions = saveSubmission(db, submission)
    .then(data => getAllSubmissions(db));

  return Promise.all([
    getUpdatedSubmissions,
    updateStatusAndGetTasks(db, taskItem.id, taskItem.status),
  ])
    .then(([submissionData, teamTasksData]) => {
      return {
        submissions: submissionData.rows,
        teamTasks: teamTasksData.rows
      };
    });
}

module.exports = {
  submitTaskForReview,
  saveFeedback,
}