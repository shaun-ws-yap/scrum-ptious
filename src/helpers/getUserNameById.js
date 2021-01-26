export default function getUserNameById(teamUsers, id) {
  return teamUsers.find(user => user.id === id).name;
}