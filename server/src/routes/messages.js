const router = require("express").Router();

module.exports = (db) => {
  // Get all messages
  router.get("/messages", (req, res) => {
    db.query(`
      SELECT 
        messages.*,
        to_char(send_time, 'Mon DD, YYYY at FMHH12:MIam') as time_sent,
        name
      FROM messages
      JOIN employees ON employees.id = sender_id
      ORDER BY send_time
    `)
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => {
      res
        .status(500)
        .send('Could not get messages from database', err);
    })
  });

  // Get most recent messages
  

  // Post message
  router.post("/messages", (req, res) => {
    const { senderId, teamId, sendTime, message } = req.body;
    db.query(`
      INSERT INTO messages (
        sender_id,
        team_id,
        send_time,
        message
      )
      VALUES ($1, $2, to_timestamp($3), $4)
      RETURNING *
    `, [senderId, teamId, sendTime / 1000, message])
    .then(data => res.json(data.rows[0]))
    .catch(err => {
      res
        .status(500)
        .send('Could not write message to database', err);
    }) 
    /**TODO: consider caching message and make another post
     * request at a later time when error occurs
     */
  });


  return router;
}