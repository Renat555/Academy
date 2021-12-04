import express, { Request, Response, NextFunction } from "express";
import { Client } from "pg";
import session from "express-session";
import connectRedis from "connect-redis";
import * as redis from "redis";
import { count } from "./intuition/count";

const redisClient = redis.createClient();
const redisStorage = connectRedis(session);
const app = express();

const postgresClient = new Client({
  user: "renat",
  host: "localhost",
  database: "academy",
  password: "pgp4h",
  port: 5432,
});
postgresClient.connect();

// app.use(
//   session({
//     store: new redisStorage({
//       host: "127.0.0.1",
//       port: 6379,
//       client: redisClient,
//     }),
//     secret: "dfgert235",
//     saveUninitialized: true,
//     cookie: { maxAge: 1000 * 60 * 60 * 24 },
//     resave: false,
//   })
// );

app.use(function (req: Request, res: Response, next: NextFunction) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/count", (req: Request, res: Response) => {
  count(postgresClient);
  res.send(JSON.stringify("user is counted"));
});

app.listen(3000);
