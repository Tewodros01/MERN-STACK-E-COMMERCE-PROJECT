import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import { JwtPayload, Secret } from "jsonwebtoken";
import { User } from "../models/user.model.js";
import * as dotenv from "dotenv";

dotenv.config();
const secret: Secret = process.env.TOKEN_SECRET as Secret;

interface DecodedTokenPayload extends JwtPayload {
  user: User;
}

export interface IRequest extends Request {
  user?: User;
  file?: Express.Multer.File; // Adjust the type based on your file object structure
}

const verifyToken = (req: IRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token);

  if (!token) return res.status(403).send({ message: "No Token Provided" });

  try {
    const decodedToken = jwt.verify(token, secret) as DecodedTokenPayload;
    console.log("Print Message", decodedToken);
    req.user = decodedToken.user;
    console.log("Req User Message", req.user);
    next();
  } catch (error) {
    res.status(401).send({ message: "Unauthorized" });
  }
};

const assignAccessToken = (user: User): string => {
  const expiresIn = "1h";
  const userObject = JSON.parse(JSON.stringify(user));
  return jwt.sign({ user: userObject }, secret, { expiresIn });
};

export { verifyToken, assignAccessToken };
