import { Router } from 'express'
import { addTransaction } from '../controllers/transaction'

const router = Router()

router.post('/', addTransaction)

export default router