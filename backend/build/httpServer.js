"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const app = (0, express_1.default)();
const port = 3000;
const client = new pg_1.Client({
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
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.get("/count", (req, res) => {
    res.send("count works");
});
app.listen(port);
