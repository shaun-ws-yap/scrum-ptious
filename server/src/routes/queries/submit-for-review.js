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

const updateSubmissionById = (db, sid, message) => {
  const queryString = `
    UPDATE submissions
    SET feedback_string = $2
    WHERE id = $1
    RETURNING *
  `;
  return db.query(queryString, [sid, message]);
};

const updateStatusAndGetTasks = (db, tid, status) => {
  return updateTaskStatus(db, tid, status)
    .then(data => getTasksByTeam(db, data.rows[0].projecttask_id));
}

//update submission by id
//update task status
//get all submissions
//get all tasks
const saveFeedback = (db, sid, message, taskId, status) => {
  const getUpdatedSubmissions = updateSubmissionById(db, sid, message)
    .then(data => getAllSubmissions(db));

  return Promise.all([
    getUpdatedSubmissions,
    updateStatusAndGetTasks(db, taskId, status)
  ])
    .then(([submissionsData, teamTasksData]) => {
      return {
        submissions: submissionsData.rows,
        teamTasks: teamTasksData.rows
      };
    });
}

// use this for submitting task
const submitTaskForReview = (db, submitTaskData) => {
  const { submission, taskItem } = submitTaskData;

  return Promise.all([
    updateStatusAndGetTasks(db, taskItem.id, taskItem.status),
    saveSubmission(db, submission)
  ])
    .then(([teamTasksData, submissionData]) => {
      return {
        teamTasks: teamTasksData.rows,
        submission: submissionData.rows[0]
      };
    });
}

module.exports = {
  submitTaskForReview,
  saveFeedback,
}