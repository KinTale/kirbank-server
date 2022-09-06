import { Request, Response } from "express";
import prisma from "@prisma/client";
const dbClient = new prisma.PrismaClient();

export const addTransaction = async (req: Request, res: Response) => {
    const {title, moneyIn, moneyOut, amount, date} = req.body
    try{
        const createTransaction = await dbClient.transaction.create({
            data:{
                title: title,
                moneyIn: moneyIn,
                moneyOut: moneyOut,
                amount: amount,
                date: date
            }
        })
    }
};
