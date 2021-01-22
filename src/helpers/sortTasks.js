export default function sortTasks(tasks) { 
  const toReturn = {
    assigned: [],
    inProgress: [],
    completed: [],
  };

  for (const task of tasks) {
    switch (task.status) {
      case 1:
        toReturn.inProgress.push(task);
        break;
      case 2:
        toReturn.inProgress.push(task);
        break;
      case 3:
        toReturn.completed.push(task);
        break;  
      default:
        toReturn.assigned.push(task);
        break;
    }
  }
  return toReturn;
};
  