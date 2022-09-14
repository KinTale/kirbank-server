import { dbClient } from "../src/utils/dbClient";
import bcrypt from "bcrypt";

async function seed() {
  await createUsers();
  await createBalances()
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

const createBalances = async () => {
  const balances = await dbClient.balance.createMany({
    data: [
      {
        userId: 1,
        balance: -599
      },
      {
        userId: 2,
        balance: -1049
      },
      {
        userId: 3,
        balance: -5550
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
        type: "withdrawl",
        userId: 1,
        // currentBalance: -550
      },
      {
        title: "Lidl",
        amount: 49,
        date: new Date(1661768000000),
        type: "withdrawl",
        userId: 1,
        // currentBalance: -599
      },
      {
        title: "Macbook M2",
        amount: 999,
        date: new Date(1662768000000),
        type: "withdrawl",
        userId: 2,
        // currentBalance: -999
      },
      {
        title: "Wireless Keyboard",
        amount: 50,
        date: new Date(1663768000000),
        type: "withdrawl",
        userId: 2,
        // currentBalance: -1049
      },
      {
        title: "Gallon of honey",
        amount: 5550,
        date: new Date(1665768000000),
        type: "withdrawl",
        userId: 3,
        // currentBalance: -5550
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
