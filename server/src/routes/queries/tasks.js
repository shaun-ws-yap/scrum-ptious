

const getTasksByEmployee = (db, uid) => {
  const queryString = `
    SELECT 
      *,
      (due_date < NOW() AND NOT status = 3) as is_late
    from tasks
    WHERE employee_id = $1
  `;
  
  return db.query(queryString, [uid])
};

const getTasksByTeam = (db, tid) => {
  const queryString = `
    SELECT 
      *,
      (due_date < NOW() AND NOT status = 3) as is_late
    from tasks
    WHERE projectTask_id = $1
  `;

  return db.query(queryString, [tid]);
};

const getDeadlinesByDueDate = (db, uid) => {
  const queryString = `
    SELECT 
      *,
      (due_date < NOW() AND NOT status = 3) as is_late
    FROM tasks
    WHERE employee_id = $1
  `;

  return db.query(queryString, [uid]);
}

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

module.exports = {
  getTasksByEmployee,
  getTasksByTeam,
  getDeadlinesByDueDate,
  saveTask,
  editTask,
  deleteTask,
}
