const router = require("express").Router();

const { getAllSubmissions, saveSubmission } = require('./queries/submissions');


module.exports = (db) => {
  // Get all submissions
  router.get("/submissions", (req, res) => {
    getAllSubmissions(db)
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => res.send(err));
  });

  // Get submission by id
  router.get("/submissions/:id", (req, res) => {
    const queryString = `
    SELECT * from submissions
    WHERE id = $1
    `;
  
    db.query(queryString, [req.params.id])
    .then(data => {
      res.json(data.rows)
    })
    .catch(e => res.send(e));
  })

  // Create and edit submission
  router.put("/submissions/", (req, res) => {
    saveSubmission(db, req.body)
    .then(data => {
      res.json(data.rows[0])
    })
    .catch(e => res.send(e));
  })

  return router;
}