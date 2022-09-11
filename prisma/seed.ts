import { dbClient } from "../src/utils/dbClient";
import bcrypt from "bcrypt";

async function seed() {
  await createUsers();
  await createTransactions();
  process.exit(0);
}

const createUsers = async () => {
  const passwordHash = await bcrypt.hash("123123", 8);
  const users = await dbClient.user.createMany({
    data: [
      {
        username: "Kiki",
        email: "kiran@email.com",
        password: passwordHash,
      },
      {
        username: "Mimi",
        email: "Marian@email.com",
        password: passwordHash,
      },
      {
        username: "Winnie The PooP",
        email: "ohWinnie@email.com",
        password: passwordHash,
      },
    ],
  });
};

const createTransactions = async () => {
  const transactions = await dbClient.transaction.createMany({
    data: [
      {
        title: "Uniqlo",
        amount: 550,
        date: new Date(1112133000000),
        userId: 1,
      },
      {
        title: "Lidl",
        amount: 49,
        date: new Date(1661768000000),
        userId: 1,
      },
      {
        title: "Macbook M2",
        amount: 999,
        date: new Date(1662768000000),
        userId: 2,
      },
      {
        title: "Wireless Keyboard",
        amount: 50,
        date: new Date(1663768000000),
        userId: 2,
      },
      {
        title: "Gallon of honey",
        amount: 5550,
        date: new Date(1665768000000),
        userId: 3,
      },
    ],
  });
  return transactions;
};

seed()
  .catch(async (e) => {
    console.error(e);
    dbClient.$disconnect;
  })
  .finally(() => process.exit(1));
