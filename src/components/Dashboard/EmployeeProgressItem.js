import React from 'react';
 
import { Doughnut, Bar, Line, Radar } from 'react-chartjs-2';
import { TabPanel } from 'react-tabs';
import filterTasksByLastThreeMonths from '../../helpers/filterTasksByLastThreeMonths';
 
export default function EmployeeProgress(props) {
 
  const lastThreeMonths = filterTasksByLastThreeMonths(props.teamTasks, props.id);
  const month = Object.keys(lastThreeMonths);
  const dataset = [];

  for (let i = 0; i < 3; i++) {
    const key = lastThreeMonths[month[i]];
    const res = {
      label: month[i],
      data: [key.assigned, key.inprogress, key.inreview, key.late, key.complete],
    }
    if (i === 0) {
      res.backgroundColor = 'rgba(212, 99, 78, 0.3)'
      res.borderColor = 'rgba(212, 99, 78, 1)';
      res.hoverBackgroundColor = 'rgba(212, 99, 78, 1)';
      res.borderCapStyle = 'butt';
      res.pointBackgroundColor = 'white';
      res.pointBorderColor = 'rgba(212, 99, 78, 1)';
      res.pointBorderWidth = '2px';
      res.pointHoverBackgroundColor = 'rgba(212, 99, 78, 1)';
      res.hoverPointBorderWidth = '2px';
      res.spanGaps = true;
      res.borderWidth = '4px';
    }
    if (i === 1) {
      res.backgroundColor = 'rgba(255, 132, 191, 0.3)';
      res.borderColor = 'rgba(255, 132, 191, 1)';
      res.hoverBackgroundColor = 'rgba(255, 132, 191, 1)';
      res.borderCapStyle = 'butt';
      res.pointBackgroundColor = 'white';
      res.pointBorderColor = 'rgba(255, 132, 191, 1)';
      res.pointBorderWidth = '2px';
      res.pointHoverBackgroundColor = 'rgba(255, 132, 191, 1)';
      res.hoverPointBorderWidth = '2px';
      res.spanGaps = true;
      res.borderWidth = '4px';
    }
    if (i === 2) {
      res.backgroundColor = 'rgba(22, 53, 83, 0.3)';
      res.borderColor = 'rgba(22, 53, 83, 1)';
      res.hoverBackgroundColor = 'rgba(22, 53, 83, 1)';
      res.borderCapStyle = 'butt';
      res.pointBackgroundColor = 'white';
      res.pointBorderColor = 'rgba(22, 53, 83, 1)';
      res.pointBorderWidth = '2px';
      res.pointHoverBackgroundColor = 'rgba(22, 53, 83, 1)';
      res.hoverPointBorderWidth = '4px';
      res.spanGaps = true;
      res.borderWidth = '4px';
    }
    dataset.push(res);
  }

  return (
    <div className="employee-progress">
      <div className="pie-chart">
        <Doughnut
          data={{
            labels: ['Assigned', 'In-progress', 'In-review', 'Late', 'Complete'],
            datasets: [
              {
                label: '# of tasks',
                data: [props.assigned, props.inProgress, props.inReview, props.late, props.complete],
                backgroundColor: [
                  'rgba(61, 173, 209, 0.65)',
                  'rgba(92, 92, 183, 0.65)',
                  'rgba(255, 181, 75, 0.65)',
                  'rgba(212, 0, 17, 0.65)',
                  'rgba(148, 203, 179, 0.65)',
                ],
                borderColor: [
                  'rgba(61, 173, 209, 1)',
                  'rgba(92, 92, 183, 1)',
                  'rgba(255, 181, 75, 1)',
                  'rgba(212, 0, 17, 1)',
                  'rgba(148, 203, 179, 1)',
                ],
                hoverBackgroundColor: [
                  'rgba(61, 173, 209, 0.85)',
                  'rgba(92, 92, 183, 0.85)',
                  'rgba(255, 181, 75, 0.85)',
                  'rgba(212, 0, 17, 0.85)',
                  'rgba(148, 203, 179, 0.85)',
                ],
                borderWidth: 1,
                hoverBorderWidth: 2,
              }
            ],
          }}
          height={400}
          width={600}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: false,
              text: props.name,
              fontSize: 25,
              fontFamily: 'Poppins'
            },
            legend: {
              display: true,
              position: 'left'
            }
          }}
        />
      </div>

      <div className="radar-chart">
        <Radar
          data={{
            labels: ['Assigned', 'In-progress', 'In-review', 'Late', 'Complete'],
            datasets: dataset
          }}
          height={400}
          width={600}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: false,
              text: props.name,
              fontSize: 25,
              fontFamily: 'Poppins'
            },
            legend: {
              display: true,
              position: 'right'
            },
            scale: {
              angleLines: {
                display: false,
              },
              ticks: {
                beginAtZero: true,
              }
            }
          }}
        />
      </div>

      
    </div>
  )
}