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
  team_id,
  avatar
)
VALUES ('Andy Lindsay', 'andy.lindsay@hotmail.com', '778-823-1085', 1, 1, 'https://i.pravatar.cc/150?img=57'),
('Shaun Yap', 'shaun.yap@outlook.com', '604-232-1850', 2, 1, 'https://i.pravatar.cc/150?img=60'),
('Kevin Li', 'kevin.li@yahoo.ca', '778-878-5678', 2, 1, 'https://i.pravatar.cc/150?img=20'),
('Clarence Chiu', 'clarence.chiu@gmail.com', '604-258-1828', 2, 1, 'https://i.pravatar.cc/150?img=56'),
('Aaron Dufall', 'aaron.dufall@hotmail.com', '604-338-1955', 2, 1, 'https://i.pravatar.cc/150?img=7');

INSERT INTO tasks (
  title,
  description,
  due_date,
  employee_id,
  status,
  is_viewed,
  projecttask_id
)
VALUES 
('Create ERD', 'Design ERD to base schema off of', '2020-11-20 17:00:00', 2, 3, true, 1),
('Create Schema', 'Write sql to create tables for database', '2020-11-20 17:00:00', 2, 3, true, 1),
('Create seeds', 'Insert into tables in database dummy data for testing', '2020-11-15 17:00:00', 2, 3, true, 1),
('Setup project skeleton', 'Install packages and write boiler plate code', '2020-11-10 17:00:00', 3, 3, true, 1),
('Start project', 'Start on project', '2020-11-10 17:00:00', 3, 3, true, 1),

('Create API server', 'Use API server to persist data from the database', '2020-12-20 17:00:00', 3, 3, true, 1),
('Setup routes', 'Setup routes to query our database tables', '2020-12-20 17:00:00', 4, 3, true, 1),
('Setup React layout(Sidebar, 1/3)', 'Begin to setup layout of front-end by creating a nav sidebar', '2020-12-15 17:00:00', 2, 3, true, 1),
('Setup React layout(Dashboard display, 2/3)', 'Setup different displays for different sections of the dashboard(Main, Tasks, Chat)', '2020-12-10 17:00:00', 2, 3, true, 1),
('Start React layout(User panel, 3/3)', 'Setup user panel to display image, name and upcoming deadlines of tasks', '2020-12-10 17:00:00', 2, 2, true, 1),

('Create Main Dashboard components', 'Create components to display the top dashboard(project progress) and bottom dashboard (independent progress)', '2021-01-20 17:00:00', 4, 2, true, 1),
('Utilize Charts.js library', 'Use the Charts.js library to visualize data of project/independent progress', '2021-01-20 17:00:00', 4, 2, true, 1),
('Use axios requests for Tasks section', 'Utilize axios to retrieve tasks according to the individual employee', '2021-01-25 17:00:00', 2, 0, false, 1),
('Use axios requests for User panel', 'Utilize axios to retrieve deadlines according to the individual employee', '2021-01-25 17:00:00', 4, 0, false, 1),
('Setup axios', 'Setup communications between our React and API server to retrieve data from our database', '2021-01-30 17:00:00', 3, 2, true, 1),

('Implement draggables library', 'Use draggables library to visualize employees taking assigned tasks to work on', '2021-02-05 17:00:00', 2, 1, false, 1),
('Implement CSS', 'Begin to style the web app with CSS', '2021-02-05 17:00:00', 2, 1, false, 1),
('Implement media queries', 'Use media queries to implement reactive design for web app', '2021-02-08 17:00:00', 2, 2, false, 1),
('Implement Dark Mode (stretch)', 'Implement a dark mode theme for better readability during the night', '2021-02-08 17:00:00', 2, 2, false, 1);


INSERT INTO submissions (
  feedback_string,
  submission_date,
  task_id
) 
VALUES (
  '',
  '2021-01-05 12:15:00',
  3
),
(
  '',
  '2021-01-15 12:15:00',
  4
),
(
  '',
  '2021-01-06 12:15:00',
  9
), 
(
  '',
  '2021-01-07 12:15:00',
  10
),
(
  '',
  '2021-01-08 12:15:00',
  13
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