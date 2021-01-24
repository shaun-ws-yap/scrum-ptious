

const getTasksByEmployee = (db, uid) => {
  const queryString = `
    SELECT *
    from tasks
    WHERE employee_id = $1
  `;
  
  return db.query(queryString, [uid])
};

const getTasksByTeam = (db, tid) => {
  const queryString = `
    SELECT *
    from tasks
    WHERE projectTask_id = $1
  `;

  return db.query(queryString, [tid]);
};

const getDeadlinesByDueDate = (db, uid) => {
  const queryString = `
    SELECT * FROM tasks
    WHERE employee_id = $1
    AND due_date > now()
  `;

  return db.query(queryString, [uid]);
}

// SELECT 
// id, 
// title, 
// description, 
// to_char(creation_date at time zone 'PST8PDT', 'Mon FMDD, YYYY at FMHH12:MI AM') as creation_date,
// to_char(due_date at time zone 'PST8PDT', 'Mon FMDD, YYYY at FMHH12:MI AM') as due_date,
// employee_id, 
// status, 
// is_viewed, 
// projecttask_id, 
// is_late 
// from tasks
// WHERE projectTask_id = $1

// Create and edit task
const saveTask = (db, taskItem) => {
  const queryString = `
    INSERT INTO tasks (title, description, due_date, employee_id, projecttask_id)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *
  `;
  const { title, description, due_date, employee_id, projecttask_id } = taskItem;
  return db.query(queryString, [title, description, due_date, employee_id, projecttask_id]);
};

const editTask = (db, id, taskItem) => {
  const { title, description, due_date, employee_id, projecttask_id } = taskItem;
  return db.query(`
    UPDATE tasks
    SET
      title = $2,
      description = $3,
      due_date = $4,
      employee_id = $5,
      projecttask_id = $6
    WHERE id = $1
    RETURNING *;
  `, [id, title, description, due_date, employee_id, projecttask_id])
};

// Delete task by id
const deleteTask = (db, id) => {
  return db.query(`
    DELETE 
    FROM tasks
    WHERE id = $1
    RETURNING *
  `, [id]);
};

const updateTaskStatus = (db, taskId, status) => {
  const queryString = `
    UPDATE tasks
    SET
      status = $2
    WHERE id = $1
    RETURNING *;
  `;
  return db.query(queryString, [taskId, status]);
};

module.exports = {
  getTasksByEmployee,
  getTasksByTeam,
  getDeadlinesByDueDate,
  saveTask,
  editTask,
  deleteTask,
  updateTaskStatus,
}
