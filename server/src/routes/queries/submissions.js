const { updateTaskStatus, getTasksByTeam } = require('./tasks');

const getAllSubmissions = db => {
  const queryString = `
  SELECT
  *
  FROM submissions
  ORDER BY submission_date
  `;
  return db.query(queryString);
}

// Create submission
const saveSubmission = (db, submission) => {
  const queryString = `
    INSERT INTO submissions (feedback_string, submission_date, task_id)
    VALUES ($1, $2, $3)
    RETURNING *
  `;
  const { feedback_string, submission_date, task_id } = submission;
  return db.query(queryString, [feedback_string, submission_date, task_id]);
};

// use this for submitting task
const submitTask = (db, submitTaskData) => {
  const { submission, taskItem } = submitTaskData;
  const getUpdatedTasks = updateTaskStatus(db, taskItem.id, taskItem.status)
    .then(data => getTasksByTeam(db, data.rows[0].projecttask_id));

  return Promise.all([
    getUpdatedTasks,
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
  getAllSubmissions,
  submitTask,
}