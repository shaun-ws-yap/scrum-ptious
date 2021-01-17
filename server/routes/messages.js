const router = require("express").Router();

module.exports = (db) => {
  // Get all messages
  router.get("/messages", (req, res) => {
    db.query(`
      SELECT * FROM messages
    `)
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => {
      res
        .status(500)
        .send('Could not get messages from database', err);
    })
  })

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
      VALUES ($1, $2, $3, $4)
      RETURNING *
    `, [senderId, teamId, sendTime, message])
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