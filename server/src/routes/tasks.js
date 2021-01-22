const router = require("express").Router();
const { 
  getTasksByEmployee, 
  getDeadlinesByDueDate, 
  getTasksByTeam, 
  saveTask, 
  deleteTask } = require('./queries/tasks');

module.exports = (db) => {


  // Get deadlines by due_date
  router.get("/tasks/deadlines/:id", (req, res) => {
    getDeadlinesByDueDate(db, req.params.id)
    .then(data => {
      res.json(data.rows);
    })
    .catch(e => res.send(e));
  });

  // Get all tasks
  router.get("/tasks", (req, res) => {
    const queryString = 'SELECT * from tasks';

    db.query(queryString)
    .then(data => {
      res.json(data.rows)
    })
    .catch(e => res.send(e));
  });

  // Get task by employee id
  router.get("/tasks/user/:id", (req, res) => {
    getTasksByEmployee(db, req.params.id)
    .then(data => {
      res.json(data.rows)
    })
    .catch(e => res.send(e));
  })
  
  // Get task by id
  router.get("/tasks/:id", (req, res) => {
    const queryString = `
    SELECT * from tasks
    WHERE id = $1
    `;

    db.query(queryString, [req.params.id])
    .then(data => {
      res.json(data.rows)
    })
    .catch(e => res.send(e));
  })

  // Get task by team_id
  router.get("/tasks/team/:id", (req, res) => {
    getTasksByTeam(db, req.params.id)
    .then(data => {
      res.json(data.rows)
    })
    .catch(e => res.send(e));
  })


  // Create and edit task
  router.put("/tasks", (req, res) => {
    saveTask(db, req.body)
    .then(data => res.send(data.rows[0]))
    .catch(e => res.send(e));
  })

  // Delete task by id
  router.delete("/tasks/:id", (req, res) => {
    deleteTask(db, req.params.id)
    .then(data => {
      res.status(204);
    })
    .catch(e => res.send(e));
  })


  return router;
}