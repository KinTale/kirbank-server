import express, { Express, Request, Response } from "express";
import cors from "cors";
import dotenv from 'dotenv'
import authRouter from './routes/auth'
import userRouter from './routes/user'
import balanceRouter from './routes/balance'
import transactionRouter from './routes/transaction'

dotenv.config()
const app: Express = express();
const port = process.env.PORT || 4000

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', authRouter)
app.use('/user', userRouter)
app.use('/balance', balanceRouter)
app.use('/transaction', transactionRouter)

app.get('/', (req:Request, res: Response)=>{
    res.send('Kirbank server is running')
})

app.listen(port, ()=> {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`)
})