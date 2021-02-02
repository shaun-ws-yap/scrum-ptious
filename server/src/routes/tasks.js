const router = require("express").Router();
const { 
  getTasksByEmployee, 
  getDeadlinesByDueDate, 
  getTasksByTeam, 
  saveTask, 
  editTask,
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
    const queryString = `
    SELECT id, title, description, (creation_date at time zone 'PST8PDT') as creation_date, (due_date at time zone 'PST8PDT') as due_date, employee_id, status, is_viewed, projecttask_id from tasks
    `;

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


  // Create task
  router.put("/tasks", (req, res) => {
    saveTask(db, req.body)
    .then(data => res.send(data.rows[0]))
    .catch(e => res.send(e));
  })

  // Edit task
  router.put("/tasks/:id", (req, res) => {
    editTask(db, req.params.id, req.body)
    .then(data => {
      res.status(204).json({});
    })
    .catch(e => res.send(e));
  })

  // Delete task by id
  router.delete("/tasks/:id", (req, res) => {
    deleteTask(db, req.params.id)
    .then(data => {
      res.status(204).json({});
    })
    .catch(e => res.send(e));
  })


  return router;
}