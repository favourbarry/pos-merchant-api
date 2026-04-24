import { Router } from "express";
import { createTransaction, getTransactions } from "./transaction.controller.js";
import { authMiddleware } from "../../middleware/auth.middleware.js";

const router = Router();

router.post("/", authMiddleware, createTransaction);
router.get("/", authMiddleware, getTransactions);

export default router;
