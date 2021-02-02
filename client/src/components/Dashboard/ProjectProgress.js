import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { taskStatus, lateTaskStatus } from '../../helpers/taskStatus';

// import ProjectProgressListItem from './ProjectProgressListItem';

export default function ProjectProgress(props) {

  const assignedTasks = taskStatus(0, props.teamTasks);
  const inProgressTasks = taskStatus(1, props.teamTasks);
  const inReviewTasks = taskStatus(2, props.teamTasks);
  const completeTasks = taskStatus(3, props.teamTasks);
  const lateTasks = lateTaskStatus(props.teamTasks);


  return (
    <div className="project-progress">
      <Doughnut
        data={{
          labels: ['Assigned', 'In-progress', 'In-review', 'Late', 'Complete'],
          datasets: [
            {
              label: '# of tasks',
              data: [assignedTasks, inProgressTasks, inReviewTasks, lateTasks, completeTasks],
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
          maintainAspectRatio: false,
          title: {
            display: true,
            text: 'Project Progress',
            fontSize: 30,
            fontFamily: 'Poppins',
          },
          legend: {
            display: true,
            position: 'bottom'
          }
        }}
      />
    </div>
  )
}