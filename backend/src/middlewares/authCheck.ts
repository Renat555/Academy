import e, { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function authCheck(req: Request, res: Response, next: NextFunction) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(" ")[1];

    jwt.verify(token, "ylskjf235", (err, decoded) => {
      if (err) {
        res.json({ message: "Authentication failed" });
      } else {
        res.json({ message: "ok" });
        next();
      }
    });
  }
}
