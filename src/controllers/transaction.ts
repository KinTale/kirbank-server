import { prisma } from "@prisma/client";
import { Response } from "express";
import { dbClient } from "../utils/dbClient";
import { CustomRequest } from "../utils/interface";

export const getTransactions = async (req: CustomRequest, res: Response) => {
  const userId = req.userId;
  try {
    const transactionList = await dbClient.transaction.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        date: "desc",
      },
    });
    console.log(transactionList);
    return res.json({ list: transactionList });
  } catch (e) {
    console.log(e);
  }
};

export const addTransaction = async (req: CustomRequest, res: Response) => {
  const { description, amount, date, type } = req.body;
  const userId = req.userId as number;

  //   ///const updateTasks = async (req, res) => {
  //   const tasks = req.body
  //   const updatedTasks = tasks.forEach(async function(task){
  //         await prisma.task.update({
  //           where: {
  //               id: Number(task.id),
  //           },
  //           data: {
  //               status: task.status,
  //               index: task.index
  //           }
  //       });
  //   })
  //   res.json('Tasks updated')
  // };
  try {
    const updateAllFollowingTransactions = async () => {
      const transactionList = await dbClient.transaction.findMany({
        where: {
          userId: userId,
          date: {
            gt: new Date(date),
          },
        },
      });

      const updatedTransactions = transactionList.forEach(
        async (transaction) => {
          const newBalanceAtTime = (balanceAtTime: number, type: string): number => {
            if (type === "deposit") return balanceAtTime + amount 
            if (type === "withdrawl") return balanceAtTime - amount 
            return balanceAtTime
          };

          await dbClient.transaction.update({
            where: {
              id: transaction.id,
            },
            data: {
              balanceAtTime: newBalanceAtTime(
                transaction.balanceAtTime,
                transaction.type
              ),
            },
          });
        }
      );

      console.log({ UpdatedTransactions: transactionList });
      return;
    };

    const transactionList = await dbClient.transaction.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        date: "desc",
      },
    });

    let previousTransaction;

    console.log({ REQUEST: typeof date });

    // console.log(Date.parse(date))

    for (let i = 0; i < transactionList.length; i++) {
      console.log(transactionList[i].date);
      if (transactionList[i].date < new Date(date)) {
        console.log("checked date", transactionList[i].date);
        previousTransaction = transactionList[i].balanceAtTime;

        if (i !== 0) updateAllFollowingTransactions();
        break;
      }
    }

    console.log({ PREVIOUS: previousTransaction });
    let newBalanceAtTime = 0;
    if (previousTransaction) {
      if (type === "deposit") newBalanceAtTime = previousTransaction + amount;
      if (type === "withdrawl") newBalanceAtTime = previousTransaction - amount;
    }

    const createdTransaction = await dbClient.transaction.create({
      data: {
        description: description,
        amount: amount,
        date: date,
        type: type,
        balanceAtTime: newBalanceAtTime,
        user: {
          connect: {
            id: userId,
          },
        },
      },
    });

    const currentBalance = await dbClient.balance.findUnique({
      where: {
        userId: userId,
      },
    });

    let newBalance;
    if (currentBalance) {
      if (type === "deposit") newBalance = currentBalance.balance + amount;
      if (type === "withdrawl") newBalance = currentBalance.balance - amount;
    }

    const updateBalance = await dbClient.balance.update({
      where: {
        userId: userId,
      },
      data: {
        balance: newBalance,
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
