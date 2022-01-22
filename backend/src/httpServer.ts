import express, { Request, Response, NextFunction } from "express";
import { Client } from "pg";
import { count } from "./intuition/count";
import { registration } from "./auth/reg";
import { dev, prod } from "./config";
import { authentication } from "./auth/auth";

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
});

app.post("/reg", (req: Request, res: Response) => {
  registration(postgresClient, req.body, res);
});

app.post("/auth", (req: Request, res: Response) => {
  authentication(postgresClient, req.body, res);
});

app.listen(3000);
