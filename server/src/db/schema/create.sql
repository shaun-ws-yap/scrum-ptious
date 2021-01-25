DROP TABLE IF EXISTS teams CASCADE;
CREATE TABLE teams (
  id SERIAL PRIMARY KEY NOT NULL,
  team_name VARCHAR(255) NOT NULL
  -- ,manager_id INTEGER REFERENCES employees(id) NOT NULL
);

DROP TABLE IF EXISTS employees CASCADE;
CREATE TABLE employees (
  id SERIAL PRIMARY KEY NOT NULL,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone_number VARCHAR(255) NOT NULL,
  role INTEGER NOT NULL,
  team_id INTEGER REFERENCES teams(id),
  avatar VARCHAR(255)
);

DROP TABLE IF EXISTS tasks CASCADE;
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY NOT NULL,
  title VARCHAR(255) NOT NULL,
  description VARCHAR(255) NOT NULL,
  creation_date TIMESTAMP NOT NULL DEFAULT NOW(),
  due_date TIMESTAMP NOT NULL,
  employee_id INTEGER NOT NULL REFERENCES employees(id) ON DELETE CASCADE,
  status INTEGER NOT NULL DEFAULT 0,
  is_viewed BOOLEAN NOT NULL DEFAULT FALSE,
  projecttask_id INTEGER REFERENCES teams(id) NOT NULL
  -- is_late BOOLEAN NOT NULL DEFAULT FALSE
);

DROP TABLE IF EXISTS submissions CASCADE;
DROP TYPE submit_status;
CREATE TYPE submit_status AS ENUM ('pending', 'rejected', 'accepted');
CREATE TABLE submissions (
  id SERIAL PRIMARY KEY NOT NULL,
  feedback_string VARCHAR(500) DEFAULT NULL,
  submission_date TIMESTAMP NOT NULL,
  task_id INTEGER  NOT NULL REFERENCES tasks(id) ON DELETE CASCADE, 
  status submit_status DEFAULT 'pending'
);

DROP TABLE IF EXISTS messages CASCADE;
CREATE TABLE messages(
  id SERIAL PRIMARY KEY NOT NULL,
  sender_id INTEGER REFERENCES employees(id) NOT NULL ,
  team_id INTEGER REFERENCES teams(id) NOT NULL,
  time_iso TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  message VARCHAR(500) NOT NULL
);