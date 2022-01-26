import express, { Request, Response, NextFunction } from "express";
import { Client } from "pg";
import cors from "cors";

import { dev, prod } from "./config";
import { authentication } from "./auth/auth";
import { count } from "./intuition/count";
import { registration } from "./auth/reg";
import { authCheck } from "./middlewares/authCheck";

const app = express();

let corsSettings = {
  origin: "http://localhost:4200",
  credentials: true,
};

let psqlSettings;

if (process.env.NODE_ENV === "dev") {
  psqlSettings = dev.psql;
  app.use(cors(corsSettings));
} else {
  psqlSettings = prod.psql;
}

const postgresClient = new Client(psqlSettings);
postgresClient.connect();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(authCheck);

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
