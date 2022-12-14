import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "@prisma/client";
import { dbClient } from "../utils/dbClient";

const secret = process.env.JWT_SECRET;

export const login = async (req: Request, res: Response) : Promise<Response> => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({
      status: "fail",
    });
  }
  try {
    const foundUser = await dbClient.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!foundUser) {
      return res.status(401).json({
        status: "fail",
        message: "User not found",
      });
    }

    const areCredentialsValid = await validateCredentials(password, foundUser);

    if (!areCredentialsValid) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect details",
      });
    }

    const token = generateJwt(foundUser.id);
    return res
      .status(200)
      .json({
        token,
        userId: foundUser.id,
        username: foundUser.username,
        status: "success",
      });
  } catch (e) {
    return res.status(500).json({
      status: "fail",
      message: "500 bad request",
    });
  }
};

function generateJwt(userId: number) {
  return jwt.sign({ userId }, secret as string, {
    expiresIn: process.env.JWT_EXPIRY,
  });
}

async function validateCredentials(password: string, user: prisma.User) {
  if (!user) {
    return false;
  }

  if (!password) {
    return false;
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return false;
  }

  return true;
}
