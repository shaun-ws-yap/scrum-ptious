export default function getUserById(teamUsers, id) {
  return teamUsers.find(user => user.id === id);
}