const getEmployeeById = (db, uid) => {
  const queryString = `
    SELECT * FROM employees
    WHERE id = $1
  `;
  return db.query(queryString, [uid])
};

const getEmployeesByTeam = (db, tid) => {
  const queryString = `
    SELECT * FROM employees
    WHERE team_id = $1
  `;
  return db.query(queryString, [tid]);
}

module.exports = {
  getEmployeeById,
  getEmployeesByTeam,
}