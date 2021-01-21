const router = require("express").Router();
const { saveMessage, getRecentMessages, getAllMessages } = require('./queries/messages');

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
    getAllMessages(db)
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