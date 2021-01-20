const saveMessage = (db, messageData) => {
  const { sender_id, team_id, time_iso, message } = messageData;
  return db.query(`
    INSERT INTO messages (
      sender_id,
      team_id,
      time_iso,
      message
    )
    VALUES ($1, $2, $3, $4)
    RETURNING *
  `, [sender_id, team_id, time_iso, message]);
}

module.exports = {
  saveMessage
}