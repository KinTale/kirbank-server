import prisma from "@prisma/client"

export const dbClient = new prisma.PrismaClient()