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
('Create ERD', 'Design ERD to base schema off of', '2020-11-15 17:00:00', 2, 3, true, 1),
('Create Schema', 'Write sql to create tables for database', '2020-11-15 17:00:00', 2, 3, true, 1),
('Create seeds', 'Insert into tables in database dummy data for testing', '2020-11-15 17:00:00', 2, 3, true, 1),
('Setup project skeleton', 'Install packages and write boiler plate code', '2020-11-20 17:00:00', 2, 3, true, 1),
('Start project', 'Start on project', '2020-11-25 17:00:00', 2, 3, true, 1),
('Review project & research libraries', 'Take a look into what libraries our project can use', '2020-12-12 17:00:00', 2, 3, true, 1),
('Implement web sockets', 'Use web sockets to host a concurrent connection between client and server', '2020-12-14 17:00:00', 2, 3, true, 1),
('Implement notifications', 'Use a react notification library to prompt updates on actions', '2020-12-14 17:00:00', 2, 3, true, 1),
('Create more seeds', 'Write more data to insert for testing', '2020-12-15 17:00:00', 2, 1, false, 1),
('C in CRUD', 'Implement a function that creates a task and persist the data', '2020-12-20 17:00:00', 2, 1, false, 1),
('U in CRUD', 'Implement a function that edits a task and persists the data', '2021-01-12 17:00:00', 2, 3, true, 1),
('D', 'Implement a function that deletes a task and persists the data', '2021-01-15 17:00:00', 2, 2, true, 1),
('Implement unit tests', 'Implement unit tests for functions that were created thus far', '2021-01-30 17:00:00', 2, 1, false, 1),
('Fix bugs', 'Fix bugs thus far', '2021-01-30 17:00:00', 2, 0, false, 1),
('Deploy on Heroku', 'Use Heroku to deploy the app', '2021-01-30 17:00:00', 2, 0, false, 1),

('Create API server', 'Use API server to persist data from the database', '2020-11-10 17:00:00', 3, 3, true, 1),
('Setup routes', 'Setup routes to query our database tables', '2020-11-10 17:00:00', 3, 3, true, 1),
('Setup React layout(Sidebar, 1/3)', 'Begin to setup layout of front-end by creating a nav sidebar', '2020-11-15 17:00:00', 3, 1, false, 1),
('Setup React layout(Dashboard display, 2/3)', 'Setup different displays for different sections of the dashboard(Main, Tasks, Chat)', '2020-11-25 17:00:00', 3, 2, true, 1),
('Start React layout(User panel, 3/3)', 'Setup user panel to display image, name and upcoming deadlines of tasks', '2020-11-26 17:00:00', 3, 2, true, 1),
('Create Task components', 'Create components to display task data (assigned/in-progress/in-review/complete)', '2020-12-05 17:00:00', 3, 2, true, 1),
('Create My Team components', 'Create components to display the team members of the project', '2020-12-05 17:00:00', 3, 3, true, 1),
('Create function to filter tasks', 'Create a function that filters tasks corresponding to the selected user', '2020-12-10 17:00:00', 3, 3, true, 1),
('Use state to display employees tasks', 'Use state to render the tasks corresponding to the selected user', '2020-12-15 17:00:00', 3, 3, true, 1),
('Implement CRUD functions', 'Implement CRUD functions to persist the requests to the database', '2020-12-20 17:00:00', 3, 2, true, 1),
('Implement basic CSS', 'Begin to style the task dashboard with basic CSS', '2021-01-10 17:00:00', 3, 2, true, 1),
('Implement story tests', 'Implement tests to ensure components are working correctly', '2020-01-10 17:00:00', 3, 3, true, 1),
('Fix bugs', 'Fix bugs thus far', '2021-01-10 17:00:00', 3, 3, true, 1),
('Implement Modals for viewing', 'Use modals from bootstrap to create a popup for when viewing tasks', '2021-01-30 17:00:00', 3, 0, false, 1),
('Implement Modals for CRUD', 'Use modals from bootstrap to create a popup for when performing CRUD operations on tasks', '2021-01-30 17:00:00', 3, 1, false, 1),

('Create Main Dashboard components', 'Create components to display the top dashboard(project progress) and bottom dashboard (independent progress)', '2020-11-10 17:00:00', 4, 2, true, 1),
('Utilize Charts.js library for project progress', 'Use the Charts.js library to visualize data of project progress', '2020-11-10 17:00:00', 4, 2, true, 1),
('Use axios requests for Tasks section', 'Utilize axios to retrieve tasks according to the individual employee', '2020-11-15 17:00:00', 4, 1, false, 1),
('Use axios requests for User panel', 'Utilize axios to retrieve deadlines according to the individual employee', '2020-11-18 17:00:00', 4, 1, false, 1),
('Setup axios', 'Setup communications between our React and API server to retrieve data from our database', '2020-11-20 17:00:00', 4, 2, true, 1),
('Create Chat components', 'Create components to display chatbox', '2020-12-06 17:00:00', 4, 3, true, 1),
('Create Chat Members components', 'Create components to display members of the team', '2020-12-06 17:00:00', 4, 3, true, 1),
('Utilize web sockets', 'Use web sockets to maintain live updates of the chat/data', '2020-12-10 17:00:00', 4, 3, true, 1),
('Create more seeds', 'Create more message seeds to show chat history', '2020-12-20 17:00:00', 4, 3, true, 1),
('Implement story tests', 'Implement tests to ensure components are working correctly', '2020-12-26 17:00:00', 4, 3, true, 1),
('Fix bugs', 'Fix bugs', '2021-01-10 17:00:00', 4, 2, true, 1),
('Implement CSS styling', 'Begin implementing styling on chat components', '2021-01-10 17:00:00', 4, 2, true, 1),
('Create logo', 'Create a logo for the app', '2021-01-20 17:00:00', 4, 3, true, 1),
('Create logout button', 'Create a logout button that resets all state and login token', '2021-01-20 17:00:00', 4, 3, true, 1),
('Implement styling on members', 'Implement CSS on styling where colors indicate online/offline status', '2021-01-30 17:00:00', 4, 3, true, 1),

('Implement draggables library', 'Use draggables library to visualize employees taking assigned tasks to work on', '2020-11-05 17:00:00', 5, 1, false, 1),
('Implement basic CSS', 'Begin to style the layout with CSS', '2020-11-05 17:00:00', 5, 1, false, 1),
('Implement media queries', 'Use media queries to implement reactive design for web app', '2020-11-08 17:00:00', 5, 2, true, 1),
('Implement Dark Mode (stretch)', 'Implement a dark mode theme for better readability during the night', '2020-11-08 17:00:00', 5, 3, true, 1),
('Refactor codebase', 'Refactor code, make codebase more modular', '2020-11-15 17:00:00', 5, 3, true, 1),
('Create Deadlines components', 'Create components to display deadlines past due date', '2020-12-05 17:00:00', 5, 3, true, 1),
('Implement components', 'Implement the newly created components into the user panel', '2020-12-10 17:00:00', 5, 3, true, 1),
('Add late status on tasks', 'Add a late badge onto tasks if the due date is past current date', '2020-12-15 17:00:00', 5, 3, true, 1),
('Utilize Chart.js library for independent progress', 'Use the Chart.js library to visualize data of independent employee progress', '2020-12-20 17:00:00', 5, 3, true, 1),
('Utilize react tabs', 'Use react tabs library to organize independent employee progress into tabs when in managers view', '2020-12-20 17:00:00', 5, 3, true, 1),
('Implement integrated tests', 'Implement tests to ensure components are working properly in unison', '2021-01-10 17:00:00', 5, 3, true, 1),
('Implement E2E tests', 'Implement tests based on user story to ensure app can be used fluently', '2021-01-10 17:00:00', 5, 1, false, 1),
('Fix bugs', 'Fix bugs thus far', '2021-01-20 17:00:00', 5, 0, false, 1),
('Implement CSS to login page', 'Begin to style login page', '2021-01-30 17:00:00', 5, 1, false, 1),
('Animate the login page (Stretch)', 'Add an animation to the login page', '2021-01-30 17:00:00', 5, 1, false, 1);


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
  '2021-01-26 13:11:12',
  'Whats poppin'
),
(
  3,
  1,
  '2021-01-26 13:12:12',
  'Waddup'
),
(
  4,
  1,
  '2021-01-26 13:12:32',
  'Yoooo'
),
(
  2,
  1,
  '2021-01-26 13:13:32',
  'You guys ready for work today'
),
(
  5,
  1,
  '2021-01-26 13:13:42',
  'Hey guys what''s going on'
),
(
  3,
  1,
  '2021-01-26 13:13:45',
  'Yeeesir'
),
(
  4,
  1,
  '2021-01-26 13:14:11',
  'You think Andy will let us have the day off early today'
),
(
  2,
  1,
  '2021-01-26 13:14:30',
  'I hope so, we''ve been working so hard the past month'
),
(
  4,
  1,
  '2021-01-26 13:14:45',
  'Yeah but we still have a lot left to do'
),
(
  2,
  1,
  '2021-01-26 13:15:03',
  'What more do we have to do for the project?'
),
(
  3,
  1,
  '2021-01-26 13:15:15',
  'We gotta fix the layout, the web app isnt responsive'
),
(
  5,
  1,
  '2021-01-26 13:15:20',
  'Yeah we also still have to implement task modals'
),
(
  2,
  1,
  '2021-01-26 13:15:32',
  'Oh yeah for CRUD operations for the tasks'
),
(
  4,
  1,
  '2021-01-26 13:15:40',
  'Yeah...'
),
(
  5,
  1,
  '2021-01-26 13:15:50',
  'It''s okay maybe Andy will let us have a few cold ones while we work'
),
(
  2,
  1,
  '2021-01-26 13:16:12',
  'TRUE cus thatll make us work more efficiently'
),
(
  1,
  1,
  '2021-01-26 13:16:20',
  'Stop slacking and get back to work!'
),
(
  3,
  1,
  '2021-01-26 13:16:30',
  'Big boss is here!'
),
(
  4,
  1,
  '2021-01-26 13:16:35',
  'Oh shoot'
),
(
  2,
  1,
  '2021-01-26 13:16:42',
  'Sorry Andy!'
);