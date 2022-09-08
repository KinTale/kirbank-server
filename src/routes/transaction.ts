import { Router } from "express";
import { addTransaction } from "../controllers/transaction";
import { validateAuth } from "../middleware/auth";

const router = Router();

router.post("/", validateAuth, addTransaction);

export default router;
