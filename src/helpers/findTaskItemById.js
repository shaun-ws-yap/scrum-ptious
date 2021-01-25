export default function filterTasksByUser(tasks, id) {
  return tasks.filter(task => task.id === id);
}