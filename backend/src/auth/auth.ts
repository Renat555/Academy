import { Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

function findUser(postgresClient: any, login: string, response: Response) {
  return new Promise((resolve, reject) => {
    postgresClient.query(
      `SELECT * FROM users WHERE login = '${login}'`,
      (err: any, res: any) => {
        if (res.rows.length === 0) {
          response.json("user not found");
        } else {
          resolve(res.rows[0]);
        }
      }
    );
  });
}

export async function authentication(
  postgresClient: any,
  user: { login: string; password: string },
  response: Response
) {
  findUser(postgresClient, user.login, response).then((result: any) => {
    if (!result.confirmed) {
      response.json("email not confirmed");
      return;
    }

    bcrypt.compare(user.password, result.password, (err, hash) => {
      if (hash) {
        let token = jwt.sign(
          {
            id: result.id,
            login: result.login,
          },
          "ylskjf235",
          {
            expiresIn: "3h",
          }
        );
        response.json({ token: token, userLogin: result.login });
      } else {
        response.json("wrong password");
      }
    });
  });
}
