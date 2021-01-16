const router = require("express").Router();

module.exports = (db) => {

  // Get all tasks
  router.get("/tasks", (req, res) => {
    const queryString = 'SELECT * from tasks';

    db.query(queryString)
    .then(data => {
      res.json(data.rows)
    })
    .catch(e => res.send(e));
  });
  
  // Get task by id
  router.get("/tasks/:id", (req, res) => {
    const queryString = `
    SELECT * from tasks
    WHERE id = 1
    `;

    db.query(queryString)
    .then(data => {
      res.json(data.rows)
    })
    .catch(e => res.send(e));
  })

  // Update task by id
  

  return router;
}