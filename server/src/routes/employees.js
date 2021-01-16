const router = require("express").Router();

module.exports = (db) => {
  router.get("/employees", (req, res) => {
    const queryString = `
    SELECT
      name,
      email,
      phone_number,
      role,
      team_id
    FROM employees
    JOIN teams ON team_id = teams.id
    ORDER BY role
    `;

    db.query(queryString)
    .then(data => {
      response.json(data.rows);
    });
  });

  return router;
}