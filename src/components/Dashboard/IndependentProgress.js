import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { taskStatus, lateTaskStatus } from '../../helpers/taskStatus';

// import ProjectProgressListItem from './ProjectProgressListItem';

// const independentTasks = [
//   {
//   "id": 1,
//   "title": "Create ERD",
//   "description": "Design ERD to base schema off of",
//   "creation_date": "2021-01-16T15:41:01.771Z",
//   "due_date": "2021-01-21T01:00:00.000Z",
//   "employee_id": 3,
//   "status": 0,
//   "is_viewed": false
//   },
//   {
//   "id": 2,
//   "title": "Create seeds",
//   "description": "Insert into tables in database dummy data for testing",
//   "creation_date": "2021-01-16T15:41:01.771Z",
//   "due_date": "2021-01-16T01:00:00.000Z",
//   "employee_id": 2,
//   "status": 2,
//   "is_viewed": true
//   },
//   {
//   "id": 3,
//   "title": "Setup project skeleton",
//   "description": "Install packages and write boiler plate code",
//   "creation_date": "2021-01-16T15:41:01.771Z",
//   "due_date": "2021-01-11T01:00:00.000Z",
//   "employee_id": 1,
//   "status": 2,
//   "is_viewed": false
//   },
//   {
//     "id": 4,
//     "title": "Setup project skeleton",
//     "description": "Install packages and write boiler plate code",
//     "creation_date": "2021-01-16T15:41:01.771Z",
//     "due_date": "2021-01-11T01:00:00.000Z",
//     "employee_id": 1,
//     "status": 3,
//     "is_viewed": false
//   },
//   {
//     "id": 5,
//     "title": "Setup project skeleton",
//     "description": "Install packages and write boiler plate code",
//     "creation_date": "2021-01-16T15:41:01.771Z",
//     "due_date": "2021-01-11T01:00:00.000Z",
//     "employee_id": 1,
//     "status": 4,
//     "is_viewed": false
//   },
//   {
//     "id": 8,
//     "title": "Setup project skeleton",
//     "description": "Install packages and write boiler plate code",
//     "creation_date": "2021-01-16T15:41:01.771Z",
//     "due_date": "2021-01-11T01:00:00.000Z",
//     "employee_id": 1,
//     "status": 4,
//     "is_viewed": false
//   },
//   {
//     "id": 10,
//     "title": "Setup project skeleton",
//     "description": "Install packages and write boiler plate code",
//     "creation_date": "2021-01-16T15:41:01.771Z",
//     "due_date": "2021-01-11T01:00:00.000Z",
//     "employee_id": 1,
//     "status": 1,
//     "is_viewed": false
//   },
//   {
//     "id": 10,
//     "title": "Setup project skeleton",
//     "description": "Install packages and write boiler plate code",
//     "creation_date": "2021-01-16T15:41:01.771Z",
//     "due_date": "2021-01-11T01:00:00.000Z",
//     "employee_id": 1,
//     "status": 2,
//     "is_viewed": false
//   }
// ]

export default function IndependentProgress(props) {

  const assignedTasks = taskStatus(0, props.independentTasks);
  const inProgressTasks = taskStatus(1, props.independentTasks);
  const inReviewTasks = taskStatus(2, props.independentTasks);
  const completeTasks = taskStatus(3, props.independentTasks);
  const lateTasks = lateTaskStatus(props.independentTasks);


  return (
    <div className="task-progress">
      <Bar
        data={{
          labels: ['Assigned', 'In-progress', 'In-review', 'Late', 'Complete'],
          datasets: [
            {
              label: '# of tasks',
              data: [assignedTasks, inProgressTasks, inReviewTasks, lateTasks, completeTasks],
              backgroundColor: [
                'rgba(28, 20, 255, 0.8)',
                'rgba(255, 247, 20, 0.8)',
                'rgba(232, 86, 2, 0.8)',
                'rgba(255, 20, 20, 0.8)',
                'rgba(33, 232, 2, 0.8)',
              ]
            }
          ],
        }}
        height={400}
        width={600}
        options={{
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Your Progress',
            fontSize: 25
          },
          legend: {
            display: true,
            position: 'right'
          },
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: true
              }
            }]
          }
        }}
      />
    </div>
  )
}