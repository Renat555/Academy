import { Response } from "express";

function createTable(postgresClient: any, login: string) {
  return new Promise((resolve, reject) => {
    postgresClient.query(
      `CREATE TABLE IF NOT EXISTS ${
        login + "Intuition"
      }(id serial PRIMARY KEY, mode VARCHAR (50) NOT NULL, correct INT NOT NULL, wrong INT NOT NULL, date TIMESTAMP NOT NULL)`,
      (err: any, res: any) => {
        resolve(res);
      }
    );
  });
}

export function saveResult(
  postgresClient: any,
  result: any,
  response: Response
) {
  createTable(postgresClient, result.login).then(() => {
    postgresClient.query(
      `INSERT INTO ${
        result.login + "Intuition"
      } (mode, correct, wrong, date) VALUES ($1, $2, $3, $4)`,
      [result.mode, result.right, result.wrong, new Date()]
    );
  });
}
