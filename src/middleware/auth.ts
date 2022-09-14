import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { dbClient } from "../utils/dbClient";
import { CustomRequest } from "../utils/interface";

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
  req: CustomRequest,
  res: Response,
  next: NextFunction
) => {
  const header = req.header("authorization");
  if (!header)
    return res.status(401).json({ authentication: "Missing header" });

  const [type, token] = header.split(" ");

  const isTypeValid: boolean = validateTokenType(type);
  if (!isTypeValid)
    return res.status(401).json({ authentication: "invalid token type" });

  const isTokenVerified = verifyToken(token);
  if (!isTokenVerified)
    return res
      .status(401)
      .json({
        authentication: "unverified or missing token",
        isTokenVerified: token,
      });

  const decodedToken = jwt.decode(token) as jwt.JwtPayload;
  console.log({ decoded: decodedToken });
  
  const foundUser = await dbClient.user.findFirst({
    where: {
      id: decodedToken.userId,
    },
  });

  if (foundUser != null) req.userId = foundUser.id;
  console.log({ midleware: req.userId });
  next();
};
