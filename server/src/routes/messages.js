const router = require("express").Router();
const { saveMessage, getRecentMessages } = require('./queries/messages');

module.exports = (db) => {
  
  // Get num_msg most recent messages
  router.get("/messages/:num_msg", (req, res) => {
    getRecentMessages(db, req.params.num_msg)
    .then(data => {
      res.json(data.rows);
    })
    .catch(err => {
      res
      .status(500)
      .send('Could not get messages from database', err);
    })
  });
  
  // Get all messages
  router.get("/messages", (req, res) => {
    db.query(`
      SELECT 
        messages.team_id,
        sender_id,
        name as sender,
        message,
        time_iso,
        to_char(time_iso, 'Mon FMDD, YYYY at FMHH12:MI AM') as time_locale
      FROM messages
      JOIN employees ON employees.id = sender_id
      ORDER BY time_iso
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

  // Post message
  router.post("/messages", (req, res) => {
    saveMessage(db, req.body)
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