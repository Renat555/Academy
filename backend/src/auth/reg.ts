import { Response } from "express";
import bcrypt from "bcrypt";
import { authentication } from "./auth";

function createTable(postgresClient: any) {
  return new Promise((resolve, reject) => {
    postgresClient.query(
      "CREATE TABLE IF NOT EXISTS users(id serial PRIMARY KEY, login VARCHAR (50) UNIQUE NOT NULL, password VARCHAR (100) NOT NULL)",
      (err: any, res: any) => {
        resolve(res);
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
  user: { login: string; password: string }
) {
  return new Promise(async (resolve, reject) => {
    let hashPass = await bcrypt.hash(user.password, 12);
    postgresClient.query(
      "INSERT INTO users (login, password) VALUES ($1, $2)",
      [user.login, hashPass],
      (err: any, res: any) => {
        resolve(res);
      }
    );
  });
}

export async function registration(
  postgresClient: any,
  user: { login: string; password: string },
  res: Response
) {
  createTable(postgresClient)
    .then(() => isUserExists(postgresClient, user.login))
    .then((result: any) => {
      if (result.rows.length === 0) {
        saveUser(postgresClient, user).then(() => {
          authentication(postgresClient, user, res);
        });
      } else {
        res.json("login exists");
      }
    });
}
