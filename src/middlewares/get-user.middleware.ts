import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";
import { JWT_SECRET } from "../constants";
import * as jwt from "jsonwebtoken";

@Injectable()
export class GetUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const authJwtToken = req.headers.authorization;

    if (!authJwtToken) {
      next();
      return;
    }

    try {
      const user = jwt.verify(authJwtToken, JWT_SECRET);

      if (user) {
        console.log("Found user details in jwt ", user);
        req["user"] = user;
      }
    } catch (err) {
      console.log("Error handling authentication jwt ", err);
    }
    next();
  }
}
