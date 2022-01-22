import { Response } from "express";
import bcrypt from "bcrypt";

function createTable(postgresClient: any) {
  return new Promise((resolve, reject) => {
    postgresClient.query(
      "CREATE TABLE IF NOT EXISTS users(id serial PRIMARY KEY, login VARCHAR (50) UNIQUE NOT NULL, password VARCHAR (100) NOT NULL, email VARCHAR (255) NOT NULL, created_on TIMESTAMP NOT NULL, confirmed BOOLEAN NOT NULL)",
      (err: any, res: any) => {
        resolve("");
      }
    );
  });
}

function isUserExists(postgresClient: any, name: string) {
  return new Promise((resolve, reject) => {
    postgresClient.query(
      `SELECT * FROM users WHERE login = '${name}'`,
      (err: any, res: any) => {
        resolve(res);
      }
    );
  });
}

async function saveUser(
  postgresClient: any,
  user: { login: string; password: string; email: string }
) {
  let hashPass = await bcrypt.hash(user.password, 12);
  postgresClient.query(
    "INSERT INTO users (login, password, email, created_on, confirmed) VALUES ($1, $2, $3, $4, $5)",
    [user.login, hashPass, user.email, new Date(), false]
  );
}

export async function registration(
  postgresClient: any,
  user: { login: string; password: string; email: string },
  res: Response
) {
  createTable(postgresClient)
    .then(() => isUserExists(postgresClient, user.login))
    .then((result: any) => {
      if (result.rows.length === 0) {
        saveUser(postgresClient, user);
        res.send(JSON.stringify("user saved"));
      } else {
        res.send(JSON.stringify("login exists"));
      }
    });
}
