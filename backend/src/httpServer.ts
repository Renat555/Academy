import express, { Request, Response, NextFunction } from "express";
import { Client } from "pg";
import cors from "cors";
import https from "https";
import fs from "fs";

import { dev, prod } from "./config";
import { authentication } from "./auth/auth";
import { registration } from "./auth/reg";
import { authCheck } from "./middlewares/authCheck";
import { saveIntuitionTest } from "./intuition/saveResult";
import { getResult } from "./intuition/getResult";

const app = express();

let psqlSettings;

if (process.env.NODE_ENV === "dev") {
  psqlSettings = dev.psql;
} else {
  psqlSettings = prod.psql;
}

app.use(cors());

const postgresClient = new Client(psqlSettings);
postgresClient.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post("/backend/reg", (req: Request, res: Response) => {
  registration(postgresClient, req.body, res);
});

app.post("/backend/auth", (req: Request, res: Response) => {
  authentication(postgresClient, req.body, res);
});

app.use(authCheck);

app.get("/backend", (req: Request, res: Response) => {
  res.json({ message: "ok" });
});

app.post("/backend/getResult", (req: Request, res: Response) => {
  getResult(postgresClient, req.body.login, res);
});

app.post("/backend/saveIntuitionTest", (req: Request, res: Response) => {
  saveIntuitionTest(postgresClient, req.body, res);
});

app.listen(3000, () => {
  console.log("HTTP Server running on port 3000");
  console.log(new Date());
});
