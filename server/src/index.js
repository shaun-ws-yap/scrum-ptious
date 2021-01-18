require('dotenv').config();

const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const cors       = require('cors');
const app        = express();

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db');
const db = new Pool(dbParams);
db.connect(err => {
  if (err) {
    return console.error("could not connect to postgres", err);
  }
});

app.use(cors());
app.use(express.static("public"));

const messageRoutes = require("../routes/messages");
const employeeRoutes = require("./routes/employees");
const submissionRoutes = require("./routes/submissions");
const taskRoutes = require("../routes/tasks");

app.use("/api", messageRoutes(db));
app.use("/api", employeeRoutes(db));
app.use("/api", submissionRoutes(db));

// Tasks route
app.use("/api", taskRoutes(db));


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`)
})