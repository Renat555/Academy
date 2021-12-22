import express, { Request, Response, NextFunction } from "express";
import { Client } from "pg";
import session from "express-session";
import connectRedis from "connect-redis";
import * as redis from "redis";
import { count } from "./intuition/count";
import { dev, prod } from "./config";

const redisClient = redis.createClient();
const redisStorage = connectRedis(session);
const app = express();

let psqlSettings;

if (process.env.NODE_ENV == "dev") {
  psqlSettings = dev.psql;
} else {
  psqlSettings = prod.psql;
}

const postgresClient = new Client(psqlSettings);
postgresClient.connect();

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
