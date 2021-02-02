import React from 'react';
import { Bar, Line } from 'react-chartjs-2';
import { taskStatus, lateTaskStatus } from '../../helpers/taskStatus';
import filterTasksByLastThreeMonths from '../../helpers/filterTasksByLastThreeMonths';

export default function IndependentProgress(props) {

  const assignedTasks = taskStatus(0, props.independentTasks);
  const inProgressTasks = taskStatus(1, props.independentTasks);
  const inReviewTasks = taskStatus(2, props.independentTasks);
  const completeTasks = taskStatus(3, props.independentTasks);
  const lateTasks = lateTaskStatus(props.independentTasks);

  const lastThreeMonths = filterTasksByLastThreeMonths(props.independentTasks, props.userInfo.id);
  const month = Object.keys(lastThreeMonths);
  const dataset = [];

  for (let i = 0; i < 3; i++) {
    const key = lastThreeMonths[month[i]];

    if (!key) {
      continue; 
    }
    
    const res = {
      label: month[i],
      data: [key.assigned, key.inprogress, key.inreview, key.late, key.complete],
    }
    if (i === 0) {
      res.backgroundColor = 'rgba(151, 229, 215, 0.3)'
      res.borderColor = 'rgba(151, 229, 215, 1)';
      res.hoverBackgroundColor = 'rgba(151, 229, 215, 1)';
      res.borderCapStyle = 'butt';
      res.pointBackgroundColor = 'white';
      res.pointBorderColor = 'rgba(151, 229, 215, 1)';
      res.pointBorderWidth = '2px';
      res.pointHoverBackgroundColor = 'rgba(151, 229, 215, 1)';
      res.hoverPointBorderWidth = '4px';
      res.spanGaps = true;
      res.fill = false;
    }
    if (i === 1) {
      res.backgroundColor = 'rgba(252, 241, 221, 0.3)';
      res.borderColor = 'rgba(252, 241, 221, 1)';
      res.hoverBackgroundColor = 'rgba(252, 241, 221, 1)';
      res.borderCapStyle = 'butt';
      res.pointBackgroundColor = 'white';
      res.pointBorderColor = 'rgba(252, 241, 221, 1)';
      res.pointBorderWidth = '2px';
      res.pointHoverBackgroundColor = 'rgba(252, 241, 221, 1)';
      res.hoverPointBorderWidth = '4px';
      res.spanGaps = true;
      res.fill = false;
    }
    if (i === 2) {
      res.backgroundColor = 'rgba(254, 183, 179, 0.3)';
      res.borderColor = 'rgba(254, 183, 179, 1)';
      res.hoverBackgroundColor = 'rgba(254, 183, 179, 1)';
      res.borderCapStyle = 'butt';
      res.pointBackgroundColor = 'white';
      res.pointBorderColor = 'rgba(254, 183, 179, 1)';
      res.pointBorderWidth = '2px';
      res.pointHoverBackgroundColor = 'rgba(254, 183, 179, 1)';
      res.hoverPointBorderWidth = '4px';
      res.spanGaps = true;
      res.fill = false;
    }
    dataset.push(res);
  }

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
                text: 'Your Current Progress',
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
              datasets: dataset,
            }}
            height={400}
            width={600}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              title: {
                display: true,
                text: 'Your Past 3 Months',
                fontSize: 25,
                fontFamily: 'Poppins'
              },
              legend: {
                display: true,
                position: 'right'
              },
              scales: {
                angleLines: {
                  display: false,
                },
                yAxes: [{
                  ticks: {
                    beginAtZero: true,
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
      </div>
    </div>
  )
}