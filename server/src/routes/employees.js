const router = require("express").Router();

module.exports = (db) => {
  router.get("/employees", (req, res) => {
    const queryString = `
    SELECT
        employees.id,
        name,
        email,
        phone_number,
        role,
        team_id,
      team_name
    FROM employees
    JOIN teams ON team_id = teams.id
    ORDER BY role
    `;
    db.query(queryString)
    .then(data => {
      res.json(data.rows);
    })
    .catch(e => res.send(e));
  });

  // Get user by id
  router.get("/employees/:id", (req, res) => {
    const queryString = `
    SELECT * FROM employees
    WHERE id = $1
    `;
    db.query(queryString, [req.params.id])
    .then(data => {
      res.json(data.rows);
    })
    .catch(e => res.send(e));
  });

  // Get team of users by team_id
  router.get("/employees/team/:id", (req, res) => {
    const queryString = `
    SELECT * FROM employees
    WHERE team_id = $1
    `;
    db.query(queryString, [req.params.id])
    .then(data => {
      res.json(data.rows);
    })
    .catch(e => res.send(e));
  });

  return router;
}