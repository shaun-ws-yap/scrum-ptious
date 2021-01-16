INSERT INTO teams (
  id,
  team_name,
  manager_id
) 
VALUES (
  1,
  'Super Team 1',
  1
);

INSERT INTO employees (
  name,
  email,
  phone_number,
  role,
  team_id
)
VALUES ('Andy Lindsay', 'andy.lindsay@hotmail.com', '778-823-1085', 1, 1),
('Shaun Yap', 'shaun.yap@outlook.com', '604-232-1850', 2, 1),
('Kevin Li', 'kevin.li@yahoo.ca', '778-878-5678', 2, 1),
('Clarence Chiu', 'clarence.chiu@gmail.com', '604-258-1828', 2, 1),
('Aaron Dufall', 'aaron.dufall@hotmail.com', '604-338-1955', 2, 1);

INSERT INTO tasks (
  title,
  description,
  due_date,
  employee_id,
  status,
  is_viewed
)
VALUES 
('Create ERD', 'Design ERD to base schema off of', '2021-01-20 17:00:00', 3, 0, false),
('Create Schema', 'Write sql to create tables for database', '2021-01-20 17:00:00', 1, 1, true),
('Create seeds', 'Insert into tables in database dummy data for testing', '2021-01-15 17:00:00', 2, 2, true),
('Setup project skeleton', 'Install packages and write boiler plate code', '2021-01-10 17:00:00', 1, 3, false),
('Start project', 'Start on project', '2021-01-10 17:00:00', 4, 4, true);


INSERT INTO submissions (
  feedback_string,
  submission_date,
  task_id
) 
VALUES (
  'LGTM!',
  '2021-01-05 12:15:00',
  5
),
(
  'Task is LATE. Will need revision: missing packages.',
  '2021-01-15 12:15:00',
  4
),
(
  'Issue with creating tables. SQL query failed: missing semicolons.',
  '2021-01-05 12:15:00',
  2
);

INSERT INTO messages (
  sender_id,
  team_id,
  send_time,
  message
)
VALUES (
  2,
  1,
  '2021-01-05 13:11:12',
  "Whats poppin"
),
(
  1,
  1,
  '2021-01-05 14:56:12',
  "Stop slacking and get back to work!"
),
(
  3,
  1,
  '2021-01-05 15:01:32',
  "Oh shit, big boss is here"
);