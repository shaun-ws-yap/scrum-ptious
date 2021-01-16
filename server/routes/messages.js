const router = require("express").Router();

module.exports = (db) => {
  // Get all messages
  router.get("/", (req, res) => {
    res.send('You got messages');
  });
  // Post message



  return router;
}