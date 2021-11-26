const express = require("express");
const { Client } = require("pg");
const path = require("path");
const app = express();
const port = 3000;

const client = new Client({
  user: "renat",
  host: "localhost",
  database: "academy",
  password: "pgp4h",
  port: 5432,
});
client.connect();

client.query("SELECT * FROM users", (err, res) => {
  console.log(err, res.rows);
  client.end();
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.static(path.join(__dirname, "./frontend/build")));
app.use(express.json());
/*app.get("/*", (req, res) => {
  res.sendFile(path.join(__dirname, "./frontend/build", "index.html"));
});*/

app.post("/reg", (req, res) => {});

app.listen(port);
