export default function filterTasksByUser(uid, tasks) {
  console.log(typeof uid);
  return tasks.filter(task => task.employee_id === Number(uid));
}