import { Response } from "express";
import { Client } from "pg";
import { IntuitTestResult } from "../interfaces/interfaces";

function createTable(postgresClient: Client, login: string) {
  return new Promise((resolve, reject) => {
    postgresClient.query(
      `CREATE TABLE IF NOT EXISTS ${
        login + "Intuition"
      }(id serial PRIMARY KEY, mode VARCHAR (50) NOT NULL, correct INT NOT NULL, wrong INT NOT NULL, date TIMESTAMP NOT NULL)`,
      (err: any, res: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
}

function save(postgresClient: Client, result: IntuitTestResult) {
  return new Promise((resolve, reject) => {
    postgresClient.query(
      `INSERT INTO ${
        result.login + "Intuition"
      } (mode, correct, wrong, date) VALUES ($1, $2, $3, $4)`,
      [result.mode, result.right, result.wrong, new Date()],
      (err: any, res: any) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      }
    );
  });
}

export async function saveIntuitionTest(
  postgresClient: Client,
  result: IntuitTestResult,
  response: Response
) {
  try {
    await createTable(postgresClient, result.login);
    await save(postgresClient, result);
  } catch (err) {
    console.log(err);
  }
}
