export default function filterTasksByUser(tasks, id) {
  return tasks.find(task => task.id === id);
}