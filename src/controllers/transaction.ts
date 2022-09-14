import { Request, Response } from "express";
import { dbClient } from "../utils/dbClient";
import { CustomRequest } from "../utils/interface";

export const getTransactions = async (req: CustomRequest, res: Response) => {
  const userId = req.userId
  try {
    const transactionList = await dbClient.transaction.findMany({
      where: {
        userId: userId,
      },
    });
   console.log(transactionList)
    return res.json({ list: transactionList });
  } catch (e) {
    console.log(e);
  }
};

export const addTransaction = async (req: CustomRequest, res: Response) => {
  const { title, amount, date , type, balanceAtTime} = req.body;
 const userId = req.userId as number
  try {
    const createdTransaction = await dbClient.transaction.create({
      data: {
        title: title,
        amount: amount,
        date: date,
        type: type,
        userId: userId,
        balanceAtTime: balanceAtTime
      },
    });
console.log({data: createdTransaction})
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
