# Scrum-ptious

A workflow dashboard that maximizes your team's efficiency by allowing assignment and tracking of tasks, as well as communications between teammates via chat. 

Socket.io is hooked into the Express server so that all data is pushed to clients in real time. Users are then immediately notified of these changes.

Developed for demonstrations purposes for the Final Project of Lighthouse Labs Web Development Bootcamp

## Overview

### Dashboard

The dashboard gives an overview of a project's progress. Using React-chartjs to visualize the portion of tasks that are assigned, in progress, in review, completed and late. The manager can also see the individual progress of his team members. 

[Responive user interface with collapsible side menu](./docs/ui-dashboard.png)[Responive user interface with collapsible side menu](./docs/ui-expanded-userInfo.png)

### Tasks

Tasks are organized into a kanban board with columns for 'assigned', 'in progress' and 'completed'.

[Kanban board for 'assigned','in-progress' and 'completed' tasks](./docs/tasks-kanban.png)

Managers can create and assign tasks to his team members. Employees can see their assigned tasks updated in real time and move them to the 'in progress' column to notify their manager that they are working on it. 

[Manager modal for creating tasks](./docs/create-new-task.png)

### Chat

Users can communicate with their team via a built-in chat feature

[Chat feature](./docs/real-time-chat.png)
 
## Tech Stack
* PostgresSql
* Express
* React.js
* Node.js
* Socket.io

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Getting Started

#### Firstly, clone the project

`git clone https://github.com/clarchiu/scrum-ptious.git`

#### Install dependencies in both the project directory and server folder

`npm install`
`cd ./server && npm install`

#### In the project directory, run to start webpack server:

`npm start`

Runs the app in the development mode.\
Open [http://localhost:3001](http://localhost:3001) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

#### In the /sever directory, run to start express/socket.io server:
`npm start` 
Open [http://localhost:8001](http://localhost:8001) to view it in the browser.

## License
[MIT](htps://choosealicense.com/licenses/mit/)
