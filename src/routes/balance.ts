import { Router } from "express";
import { getBalance } from "../controllers/balance";
import { validateAuth } from "../middleware/auth";

const router = Router();

router.get("/",validateAuth, getBalance);


export default router;
