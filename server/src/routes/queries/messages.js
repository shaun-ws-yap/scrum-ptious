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
};

const getMessagesAfterTime = (db, time_iso) => {
  return db.query(`
    SELECT 
      T1.team_id,
      sender_id,
      name as sender,
      message,
      (time_iso at time zone 'PST8PDT') as time_iso,
      to_char(time_iso at time zone 'PST8PDT', 'Mon FMDD, YYYY at FMHH12:MI AM') as time_locale
    FROM (
      SELECT * 
      FROM messages
      WHERE time_iso > $1
      ORDER BY time_iso DESC
    ) T1
    JOIN employees ON employees.id = sender_id
    ORDER BY time_iso
  `, [time_iso]);
}

const getRecentMessages = (db, numMsg) => {
  return db.query(`
    SELECT 
      T1.team_id,
      sender_id,
      name as sender,
      message,
      (time_iso at time zone 'PST8PDT') as time_iso,
      to_char(time_iso at time zone 'PST8PDT', 'Mon FMDD, YYYY at FMHH12:MI AM') as time_locale
    FROM (
      SELECT * 
      FROM messages
      ORDER BY time_iso DESC
      LIMIT $1
    ) T1
    JOIN employees ON employees.id = sender_id
    ORDER BY time_iso
  `, [numMsg])
};

const queryMessages = (db, numMsg, time_iso) => {
  return db.query(`
    SELECT 
      T1.team_id,
      sender_id,
      name as sender,
      message,
      (time_iso at time zone 'PST8PDT') as time_iso,
      to_char(time_iso at time zone 'PST8PDT', 'Mon FMDD, YYYY at FMHH12:MI AM') as time_locale
    FROM (
      SELECT * 
      FROM messages
      WHERE time_iso < $2
      ORDER BY time_iso DESC
      LIMIT $1
    ) T1
    JOIN employees ON employees.id = sender_id
    ORDER BY time_iso
  `, [numMsg, time_iso]);
};

const getAllMessages = db => {
  return db.query(`
    SELECT 
      messages.team_id,
      sender_id,
      name as sender,
      message,
      (time_iso at time zone 'PST8PDT') as time_iso,
      to_char(time_iso at time zone 'PST8PDT', 'Mon FMDD, YYYY at FMHH12:MI AM') as time_locale
    FROM messages
    JOIN employees ON employees.id = sender_id
    ORDER BY time_iso
  `)
};

module.exports = {
  saveMessage,
  getRecentMessages,
  getAllMessages,
  queryMessages,
  getMessagesAfterTime,
}