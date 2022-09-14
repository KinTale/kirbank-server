import { Response } from "express";
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
  const { description, amount, date , type, balanceAtTime} = req.body;
 const userId = req.userId as number
  try {
    const createdTransaction = await dbClient.transaction.create({
      data: {
        description: description,
        amount: amount,
        date: date,
        type: type,
        balanceAtTime: balanceAtTime,
        user: {
          connect: {
            id: userId
          }
        }
      },
    });

    const currentBalance = await dbClient.balance.findUnique({
      where: {
        userId: userId,
      },
    })

    let newBalance 
    if(currentBalance) {
      if(type === "deposit") newBalance = currentBalance.balance + amount
      if(type === "withdrawl") newBalance = currentBalance.balance - amount
      else newBalance = currentBalance.balance
    }

    const updateBalance = await dbClient.balance.update({
      where: {
        userId: userId,
      },
      data: {
        balance: newBalance
      },
    })
    
// console.log({data: createdTransaction})
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
