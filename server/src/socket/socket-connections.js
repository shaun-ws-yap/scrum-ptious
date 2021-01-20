const userSocketIdMap = new Map(); // map of online usernames and their clients

const addClientToMap = (uid, sid) => {
  if (!userSocketIdMap.has(uid)) { //when user is joining first time
    userSocketIdMap.set(uid, new Set([sid]));
    return
  } //user had already joined from one client and now joining using another client
  userSocketIdMap.get(uid).add(sid);
};

const removeClientFromMap = (uid, sid) => {
  if (userSocketIdMap.has(uid)) {
    const userSocketIdSet = userSocketIdMap.get(uid);
    userSocketIdSet.delete(sid);
    if (userSocketIdSet.size === 0 ) { //if there are no clients for a user, remove that user from online list (map)
      userSocketIdMap.delete(uid);
    }
  }
};

const parseMap = () => {
  const onlineUsers = [];
  for (const key of userSocketIdMap.keys()) {
    onlineUsers.push(key);
  }
  return onlineUsers;
};

module.exports = {
  addClientToMap,
  removeClientFromMap,
  parseMap
}