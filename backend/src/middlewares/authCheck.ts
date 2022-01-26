import e, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authCheck(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];
    jwt.verify(token, "longer-secret-is-better", (err, decoded) => {
      if (err) {
        res.status(401).json({ messge: "Authentication faliled" });
      } else {
        next();
      }
    });
  }
}
