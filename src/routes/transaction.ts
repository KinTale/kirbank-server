import { Router } from "express";
import { getTransactions, addTransaction } from "../controllers/transaction";
import { validateAuth } from "../middleware/auth";

const router = Router();

router.get("/",validateAuth, getTransactions);
router.post("/", validateAuth, addTransaction);

export default router;
