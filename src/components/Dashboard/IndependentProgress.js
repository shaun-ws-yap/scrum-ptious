import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { taskStatus, lateTaskStatus } from '../../helpers/taskStatus';

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