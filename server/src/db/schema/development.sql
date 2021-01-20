INSERT INTO teams (
  id,
  team_name
  -- ,manager_id
) 
VALUES (
  1,
  'Super Team 1'
  -- .1
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
  is_viewed,
  projecttask_id,
  is_late
)
VALUES 
('Create ERD', 'Design ERD to base schema off of', '2021-01-20 17:00:00', 3, 0, false, 1, false),
('Create Schema', 'Write sql to create tables for database', '2021-01-20 17:00:00', 4, 1, true, 1, false),
('Create seeds', 'Insert into tables in database dummy data for testing', '2021-01-15 17:00:00', 2, 2, true, 1, true),
('Setup project skeleton', 'Install packages and write boiler plate code', '2021-01-10 17:00:00', 2, 2, false, 1, true),
('Start project', 'Start on project', '2021-01-10 17:00:00', 4, 1, true, 1, true),

('Create API server', 'Use API server to persist data from the database', '2021-01-20 17:00:00', 2, 3, false, 1, false),
('Setup routes', 'Setup routes to query our database tables', '2021-01-20 17:00:00', 3, 3, true, 1, false),
('Setup React layout(Sidebar, 1/3)', 'Begin to setup layout of front-end by creating a nav sidebar', '2021-01-15 17:00:00', 3, 3, true, 1, false),
('Setup React layout(Dashboard display, 2/3)', 'Setup different displays for different sections of the dashboard(Main, Tasks, Chat)', '2021-01-10 17:00:00', 2, 2, false, 1, true),
('Start React layout(User panel, 3/3)', 'Setup user panel to display image, name and upcoming deadlines of tasks', '2021-01-10 17:00:00', 4, 2, true, 1, true),
('Create Main Dashboard components', 'Create components to display the top dashboard(project progress) and bottom dashboard (independent progress)', '2021-01-20 17:00:00', 5, 0, false, 1, false),
('Utilize Charts.js library', 'Use the Charts.js library to visualize data of project/independent progress', '2021-01-20 17:00:00', 5, 3, true, 1, false),
('Setup axios', 'Setup communications between our React and API server to retrieve data from our database', '2021-01-15 17:00:00', 2, 2, true, 1, true),
('Use axios requests for Tasks section', 'Utilize axios to retrieve tasks according to the individual employee', '2021-01-10 17:00:00', 3, 0, false, 1, true),
('Use axios requests for User panel', 'Utilize axios to retrieve deadlines according to the individual employee', '2021-01-10 17:00:00', 3, 1, true, 1, true);


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
  time_iso,
  message
)
VALUES (
  2,
  1,
  '2021-01-05 13:11:12',
  'Whats poppin'
),
(
  1,
  1,
  '2021-01-05 14:56:12',
  'Stop slacking and get back to work!'
),
(
  3,
  1,
  '2021-01-05 15:01:32',
  'Oh shit, big boss is here'
),
(
  4,
  1,
  '2021-01-05 17:01:32',
  'Everybody run!'
),
(
  5,
  1,
  '2021-01-05 17:10:32',
  'Hey guys what''s going on'
)