const Promise = require("bluebird");
const { getEmployeeById, getEmployeesByTeam } = require('./employees');
const { 
  getTasksByEmployee,
  getTasksByTeam,
  getDeadlinesByDueDate } = require('./tasks');

const getLoginData = (db, uid, callback) => {

  const userData = getEmployeeById(db, uid);
  
  const teamData = userData
    .then(data => getEmployeesByTeam(db, data.rows[0].team_id));

  const teamTasksData = userData
    .then(data => getTasksByTeam(db, data.rows[0].team_id));

  const filteredTasksData = userData
    .then(data => {
      const userInfo = data.rows[0];
      if (userInfo.role === 1) {
        return getTasksByTeam(db, userInfo.team_id);
      }
      return getTasksByEmployee(db, uid);
    });

  return Promise.join(
    userData, 
    teamData, 
    getTasksByEmployee(db, uid), 
    teamTasksData,
    getDeadlinesByDueDate(db, uid), 
    (userData, teamData, userTasksData, teamTasksData, deadlinesData) => {
      const loginData = {
        userInfo: userData.rows[0],
        teamUsers: teamData.rows,
        userTasks: userTasksData.rows,
        teamTasks: teamTasksData.rows,
        deadlines: deadlinesData.rows,
      }
      callback(loginData);
    });
}

module.exports = {
  getLoginData,
}