import { Response } from "express";
import { dbClient } from "../utils/dbClient";
import { CustomRequest } from "../utils/interface";

export const getBalance = async (
  req: CustomRequest,
  res: Response
): Promise<Response> => {
  try {
    const memberBalance = await dbClient.balance.findUnique({
      where: {
        userId: req.userId,
      },
    });
    return res.status(200).json({ data: memberBalance });
  } catch (e) {
    return res.status(500).json("unable to get balance");
  }
};
