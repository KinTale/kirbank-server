import { Request, Response } from "express";
import bcrypt from "bcrypt";
import validator from "email-validator";
import { dbClient } from "../utils/dbClient";

export const getUser = async (req: Request, res: Response) => {
  try {
    const memberList = await dbClient.user.findMany();
    return res.status(200).json({ data: memberList });
  } catch (e) {
    console.log("ERROR", e);
    return res.status(500).json("unable to get users");
  }
};
export const createUser = async (req: Request, res: Response) => {
  const passwordHash = await bcrypt.hash(req.body.password, 8);
  try {
    const existingUser = await dbClient.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (existingUser) {
      return res.status(400).json({
        status: "fail, email already in use",
      });
    }
    if (!validator.validate(req.body.email)) {
      return res.status(400).json({
        status: "fail, invalid email address",
      });
    }

    const createdUser = await dbClient.user.create({
      data: {
        username: req.body.username,
        email: req.body.email,
        password: passwordHash,
        balance: {
          create: {
            balance: 0
          }
        }
      },
    });
    
    return res.status(200).json({
      status: "success",
      data: createdUser,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail, server error",
    });
  }
};
