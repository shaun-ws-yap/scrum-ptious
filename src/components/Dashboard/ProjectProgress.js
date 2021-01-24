import React from 'react';
import { Doughnut, Bar } from 'react-chartjs-2';
import { taskStatus, lateTaskStatus } from '../../helpers/taskStatus';

// import ProjectProgressListItem from './ProjectProgressListItem';

export default function ProjectProgress(props) {

  const assignedTasks = taskStatus(0, props.teamTasks);
  const inProgressTasks = taskStatus(1, props.teamTasks);
  const inReviewTasks = taskStatus(2, props.teamTasks);
  const completeTasks = taskStatus(3, props.teamTasks);
  const lateTasks = lateTaskStatus(props.teamTasks);


  return (
    <div className="task-progress">
      <Doughnut
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
            text: 'Project Progress',
            fontSize: 25
          },
          legend: {
            display: true,
            position: 'right'
          }
        }}
      />
    </div>
  )
}