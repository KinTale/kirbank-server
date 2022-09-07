import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { dbClient } from "../utils/dbClient";

const secret = process.env.JWT_SECRET as string;

const validateTokenType = (type: string): boolean => {
  if (!type) return false;
  if (type.toUpperCase() !== "BEARER") return false;
  return true;
};

const verifyToken = (token: string): boolean | void => {
  if (!token) return false;
  return jwt.verify(token, secret, (error) => {
    return !error;
  });
};

export const validateAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const header = req.header("authorization");
  if (!header)
    return res.status(401).json({ authentication: "Missing header" });

  const [type, token] = header.split("");

  const isTypeValid = validateTokenType(type);
  if (!isTypeValid)
    return res.status(401).json({ authentication: "invalid token type" });

  const isTokenVerified = verifyToken(token);
  if (!isTokenVerified)
    return res
      .status(401)
      .json({ authentication: "unverified or missing token" });

  const decodedToken = jwt.decode(token) as string;
  const foundUser = await dbClient.user.findFirst({
    where: {
      id: parseInt(decodedToken),
    },
  });
//   req.userId = foundUser
  next()
};
