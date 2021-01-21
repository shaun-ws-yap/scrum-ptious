const router = require("express").Router();

module.exports = (db) => {


  // Get deadlines by due_date
  router.get("/tasks/deadlines/:id", (req, res) => {
    const queryString = `
    SELECT * FROM tasks
    WHERE employee_id = $1
    AND due_date > now()
    `;

    db.query(queryString, [req.params.id])
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
    const queryString = `
    SELECT * FROM tasks
    WHERE employee_id = $1
    `;
    
    db.query(queryString, [req.params.id])
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
    const queryString = `
    SELECT * from tasks
    WHERE projectTask_id = $1
    `;

    db.query(queryString, [req.params.id])
    .then(data => {
      res.json(data.rows)
    })
    .catch(e => res.send(e));
  })


  // Create and edit task
  router.put("/tasks", (req, res) => {
    const params = req.body;

    console.log(params)

    const queryString = `
      INSERT INTO tasks (title, description, due_date, employee_id, projecttask_id)
      VALUES ($1, $2, $3, $4, $5)
    `;

    db.query(queryString, [params.title, params.description, params.due_date, params.employee_id, params.projecttask_id])
    .then(data => {
      res.status(204).json({});
    })
    .catch(e => res.send(e));
  })

  // Delete task by id
  router.delete("/tasks/:id", (req, res) => {
    db.query("DELETE FROM tasks WHERE id = $1", [req.params.id])
    .then(data => {
      res.status(204);
    })
    .catch(e => res.send(e));
  })


  return router;
}