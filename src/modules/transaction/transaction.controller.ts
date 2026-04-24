import { randomUUID } from "crypto";
import type { Request, Response } from "express";
import db from "../../config/db.js";

export const createTransaction = async (req: Request, res: Response) => {
    const { amount } = req.body;
    await db("transactions").insert({
        id: randomUUID(),
        merchant_id: (req as any).user.id,
        amount,
        status: "Success",
    });
    res.status(201).json({ message: "Transaction created" });
};

export const getTransactions = async (req: Request, res: Response) => {
    const transactions = await db("transactions")
        .where({ merchant_id: (req as any).user.id })
        .orderBy("created_at", "desc");
    res.json(transactions);
};
