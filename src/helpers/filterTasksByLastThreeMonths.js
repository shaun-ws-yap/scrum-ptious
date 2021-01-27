export default function filterTasksByLastThreeMonths(tasks, userId) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const filteredTasks = {};

  for (let i = 2; i >= 0; i--) {
    const today = new Date();

    today.setMonth(today.getMonth() - i);
    const monthName = monthNames[today.getMonth()];
    filteredTasks[monthName] = {
      assigned: 0,
      inprogress: 0,
      inreview: 0,
      completed: 0,
      late: 0,
    };
  }

  for (const task of tasks) {
    const monthCreated = monthNames[new Date(task.creation_date).getMonth()];

    switch(task.status) {
      case 0:
        if (task.employee_id === userId) {
          filteredTasks[monthCreated].assigned = + 1;
        }
        break;
      case 1:
        if (task.employee_id === userId) {
          filteredTasks[monthCreated].inprogress = + 1;
        }
        break;

      case 2:
        if (task.employee_id === userId) {
          filteredTasks[monthCreated].inreview = + 1;
        }
        break;
      
      case 3:
        if (task.employee_id === userId) {
          filteredTasks[monthCreated].completed = + 1;
        }
        break;
    }

    if (task.is_late) {
      if (task.employee_id === userId) {
        filteredTasks[monthCreated].late = + 1;
      }
    }
  }

  return filteredTasks;
}