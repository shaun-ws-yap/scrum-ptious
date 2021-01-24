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

module.exports = {
  saveSubmission
}