import { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function findUser(postgresClient: any, login: string) {
  return new Promise((resolve, reject) => {
    postgresClient.query(
      `SELECT * FROM users WHERE login = '${login}'`,
      (err: any, res: any) => {
        resolve(res);
      }
    );
  });
}

export async function authentication(
  postgresClient: any,
  user: { login: string; password: string },
  res: Response
) {
  findUser(postgresClient, user.login).then((result: any) => {
    if (result.rows.length === 0) {
      res.send(JSON.stringify("user not found"));
    } else {
      bcrypt.compare(user.password, result.rows[0].password, (err, hash) => {
        if (hash) {
          let token = jwt.sign(
            {
              id: result.rows[0].id,
              login: result.rows[0].login,
            },
            ";lskjf235",
            {
              expiresIn: "1h",
            }
          );
          res
            .status(200)
            .json({ token: token, userLogin: result.rows[0].login });
        } else {
          res.send(JSON.stringify("wrong password"));
        }
      });
    }
  });
}
