import React from 'react';
 
import { Doughnut, Bar, Line, Radar } from 'react-chartjs-2';
import { TabPanel } from 'react-tabs';
import filterTasksByLastThreeMonths from '../../helpers/filterTasksByLastThreeMonths';
import styled from 'styled-components';
 
export default function EmployeeProgress(props) {
 
  const lastThreeMonths = filterTasksByLastThreeMonths(props.teamTasks, props.id);
  const month = Object.keys(lastThreeMonths);
  const dataset = [];

  const EmployeeProgress = styled.div`
  border: ${props => props.theme.chartBorder};
  background: ${props => props.theme.chartBackground};
  `;

  for (let i = 0; i < 3; i++) {
    const key = lastThreeMonths[month[i]];
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
    }
    dataset.push(res);
  }

  return (
    <EmployeeProgress className="employee-progress">
      <div className="pie-chart">
        <Doughnut
          data={{
            labels: ['Assigned', 'In-progress', 'In-review', 'Late', 'Complete'],
            datasets: [
              {
                label: '# of tasks',
                data: [props.assigned, props.inProgress, props.inReview, props.late, props.complete],
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
            responsive: true,
            maintainAspectRatio: false,
            title: {
              display: false,
              text: props.name,
              fontSize: 25,
              fontFamily: 'Poppins',
            },
            legend: {
              display: true,
              position: 'left',
              labels: {
                fontColor: props.theme === 'light' ? '' : 'white',
              }
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
              text: 'props.name',
              fontSize: 25,
              fontFamily: 'Poppins',
            },
            legend: {
              display: true,
              position: 'left',
              labels: {
                fontColor: props.theme === 'light' ? '' : 'white'
              }
            },
            scale: {
              angleLines: {
                display: false,
              },
              ticks: {
                suggestedMin: 1,
                suggestedMax: 2,
              },
              pointLabels: {
                fontColor: props.theme === 'light' ? '' : 'white',
              }
            }
          }}
        />
      </div>
    </EmployeeProgress>
  )
}