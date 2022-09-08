import { Request, Response } from "express";
import { dbClient } from "../utils/dbClient";

interface Transaction {
  title: string,
  amount: number,
  date: Date,
  userId: number
}

export const addTransaction = async (req: Request, res: Response) => {
  const { title, amount, date, userId } = req.body;

  try {
    const createdTransaction: Transaction = await dbClient.transaction.create({
      data: {
        title: title,
        amount: amount,
        date: date,
        userId: userId,
      },
    });

    return res.status(200).json({
      status: "success",
      data: createdTransaction,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      status: "fail, server error",
    });
  }
};
