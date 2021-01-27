export default function filterDeadlineTasks(tasks) {
  const dateNow = new Date().getTime();
  const convertDate = (date) => new Date(date).getTime();

  return tasks.filter(task => convertDate(task.due_date) < dateNow && (task.status === 0 || task.status === 1));
}
