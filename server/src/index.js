require('dotenv').config();

const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const app        = express();

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db');
const db = new Pool(dbParams);
db.connect();

app.use(express.static("public"));

const messageRoutes = require("../routes/messages");
const employeeRoutes = require("./routes/employees");
const submissionRoutes = require("./routes/submissions");
app.use("/messages", messageRoutes(db));
app.use("/api", employeeRoutes(db));
app.use("/api", submissionRoutes(db));

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})