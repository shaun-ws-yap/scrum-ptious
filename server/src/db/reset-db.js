require('dotenv').config();
const fs = require("fs");
const path = require("path");

// PG database client/connection setup
const { Client } = require('pg');
const dbParams = require('../lib/db');
const db = new Client(dbParams);
db.connect(err => {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
});

function read(file) {
  return new Promise((resolve, reject) => {
    fs.readFile(
      file,
      {
        encoding: "utf-8"
      },
      (error, data) => {
        if (error) return reject(error);
        resolve(data);
      }
    );
  });
}

Promise.all([
  read(path.resolve(__dirname, `./schema/create.sql`)),
  read(path.resolve(__dirname, `./schema/development.sql`))
])
  .then(([create, seed]) => {
    db.query(create)
      .then(() => db.query(seed))
      .then(() => {
        console.log("Database Reset");
        db.end();
      })
      .catch(error => {
        console.log(`Error resetting db: ${error}`);
        db.end();
      });
  })
  