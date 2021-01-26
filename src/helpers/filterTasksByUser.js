export default function filterTasksByUser(uid, tasks) {
  return tasks.filter(task => task.employee_id === Number(uid));
}