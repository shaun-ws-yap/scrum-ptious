const router = require("express").Router();

module.exports = (db) => {
  router.get("/submissions", (req, res) => {
    const queryString = `
    SELECT
      feedback_string,
      submission_date,
      task_id
    FROM submissions
    JOIN tasks ON task_id = tasks.id
    ORDER BY submission_date
    `;
    db.query(queryString)
    .then(data => {
      res.json(data.rows);
    });
  });

  return router;
}