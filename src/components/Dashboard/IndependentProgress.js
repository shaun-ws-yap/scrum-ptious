import React from 'react';
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { taskStatus, lateTaskStatus } from '../../helpers/taskStatus';

export default function IndependentProgress(props) {

  const assignedTasks = taskStatus(0, props.independentTasks);
  const inProgressTasks = taskStatus(1, props.independentTasks);
  const inReviewTasks = taskStatus(2, props.independentTasks);
  const completeTasks = taskStatus(3, props.independentTasks);
  const lateTasks = lateTaskStatus(props.independentTasks);


  return (
    <div className="employee-chart">

      {/* stack em against others */}
      <div className="independent-progress">
        <div className="bar-chart">
          <Bar
            data={{
              labels: ['Assigned', 'In-progress', 'In-review', 'Late', 'Complete'],
              datasets: [
                {
                  label: '# of tasks',
                  data: [assignedTasks, inProgressTasks, inReviewTasks, lateTasks, completeTasks],
                  backgroundColor: [
                    'rgba(61, 173, 209, 0.2)',
                    'rgba(92, 92, 183, 0.2)',
                    'rgba(255, 181, 75, 0.2)',
                    'rgba(212, 0, 17, 0.2)',
                    'rgba(148, 203, 179, 0.2)',
                  ],
                  borderColor: [
                    'rgba(61, 173, 209, 1)',
                    'rgba(92, 92, 183, 1)',
                    'rgba(255, 181, 75, 1)',
                    'rgba(212, 0, 17, 1)',
                    'rgba(148, 203, 179, 1)',
                  ],
                  hoverBackgroundColor: [
                    'rgba(61, 173, 209, 0.5)',
                    'rgba(92, 92, 183, 0.5)',
                    'rgba(255, 181, 75, 0.5)',
                    'rgba(212, 0, 17, 0.5)',
                    'rgba(148, 203, 179, 0.5)',
                  ],
                  borderWidth: 1,
                  hoverBorderWidth: 2,
                },
              ],
            }}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false,
              title: {
                display: true,
                text: 'Your Progress',
                fontSize: 25,
                fontFamily: 'Poppins'
              },
              legend: {
                display: true,
                position: 'right'
              },
              scales: {
                yAxes: [{
                  ticks: {
                    beginAtZero: true
                  },
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)"
                  }
                }],
                xAxes: [{
                  gridLines: {
                    color: "rgba(0, 0, 0, 0)"
                  }
                }]
              }
            }}
          />
        </div>

        <div className="line-chart">
          <Line 
            data={{
              labels: ['Assigned', 'In-progress', 'In-review', 'Late', 'Complete'],
              datasets: [
                {
                  label: '# of tasks',
                  spanGaps: false,
                  data: [assignedTasks, inProgressTasks, inReviewTasks, lateTasks, completeTasks],
                  fill: false,
                  backgroundColor: [
                    'rgba(61, 173, 209, 0.2)',
                    'rgba(92, 92, 183, 0.2)',
                    'rgba(255, 181, 75, 0.2)',
                    'rgba(212, 0, 17, 0.2)',
                    'rgba(148, 203, 179, 0.2)',
                  ],
                  borderColor: [
                    'rgba(61, 173, 209, 1)',
                    'rgba(92, 92, 183, 1)',
                    'rgba(255, 181, 75, 1)',
                    'rgba(212, 0, 17, 1)',
                    'rgba(148, 203, 179, 1)',
                  ],
                  hoverBackgroundColor: [
                    'rgba(61, 173, 209, 0.5)',
                    'rgba(92, 92, 183, 0.5)',
                    'rgba(255, 181, 75, 0.5)',
                    'rgba(212, 0, 17, 0.5)',
                    'rgba(148, 203, 179, 0.5)',
                  ],
                  borderWidth: 1,
                  hoverBorderWidth: 2,
                }
              ],
            }}
            height={400}
            width={600}
            options={{
              maintainAspectRatio: false,
              title: {
                display: true,
                text: 'Your Peers',
                fontSize: 25,
                fontFamily: 'Poppins'
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
      </div>
    </div>
  )
}