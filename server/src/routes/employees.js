const router = require("express").Router();

module.exports = (db) => {
  // Get all employees
  router.get("/employees", (req, res) => {
    const queryString = `
    SELECT
    *
    FROM employees
    ORDER BY role
    `;
    db.query(queryString)
    .then(data => {
      res.json(data.rows);
    });
  });

  return router;
}