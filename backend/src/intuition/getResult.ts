import { Response } from "express";
import { Client } from "pg";

export function getResult(
  postgresClient: Client,
  login: string,
  response: Response
) {
  postgresClient.query(
    `SELECT * FROM ${login + "Intuition"} ORDER BY id DESC`,
    (err: any, res: any) => {
      if (res) {
        response.json(res.rows);
      } else {
        response.json("[]");
      }
    }
  );
}
