export default function filterTasksByLastThreeMonths(tasks, userId) {
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const status = ["assigned", "inprogress", "inreview", "completed"];

  const filteredTasks = {};

  console.log(tasks);

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
    const monthCreated = monthNames[new Date(task.due_date).getMonth()];
    
    for (const month in filteredTasks) {
      if (month === monthCreated && task.employee_id === userId) {
        filteredTasks[month][status[task.status]] += 1;

        if (task.is_late) {
          filteredTasks[month].late++;
        }
      }
    }
  }
  return filteredTasks;
}