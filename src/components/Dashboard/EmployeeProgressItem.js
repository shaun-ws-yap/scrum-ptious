import React from 'react';
 
import { Doughnut, Bar, Line } from 'react-chartjs-2';
import { TabPanel } from 'react-tabs';
 
export default function EmployeeProgress(props) {
 

  return (
    <div className="employee-progress">
      <Line
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
          maintainAspectRatio: false,
          title: {
            display: true,
            text: props.name,
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
  )
}