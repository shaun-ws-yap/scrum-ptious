const router = require("express").Router();

module.exports = (db) => {
  // Get all submissions
  router.get("/submissions", (req, res) => {
    const queryString = `
    SELECT
    *
    FROM submissions
    ORDER BY submission_date
    `;
    db.query(queryString)
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => res.send(err));
  });

  // Create a submission
  router.post("/submissions/:id", (req, res) => {
    const { feedback_string, submission_date, task_id } = req.body;
    const queryString = `
    INSERT INTO submissions (feedback_string, submission_date, task_id)
    VALUES ($1, $2, $3)
    RETURNING *
    `;
    db.query(queryString, [feedback_string, submission_date, task_id])
    .then(data => {
      res.json(data.rows[0])
    })
  })

  return router;
}