export default function filterTasksByUser(uid, tasks) {
  console.log(typeof uid);
  const toRet = tasks.filter(task => task.employee_id === Number(uid));
  console.log(toRet);
  return toRet;
}