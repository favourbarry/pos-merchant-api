import bcrypt from "bcrypt";
import { v4 as uuidv4 } from "uuid";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import db from "../../config/db.js";

const hashPassword = (password: string) => bcrypt.hash(password, 10);
const comparePassword = (password: string, hash: string) => bcrypt.compare(password, hash);

export const registerUser = async (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    const hashed = await hashPassword(password);
    await db("merchants").insert({
        id: uuidv4(),
        name,
        email,
        password: hashed,
        created_at: new Date(),
        updated_at: new Date(),
    });
    res.status(201).json({ message: "Merchant registered successfully" });
};

export const loginMerchant = async (req: Request, res: Response) => {
    const { email, password } = req.body;
    const merchant = await db("merchants").where({ email }).first();
    if (merchant && await comparePassword(password, merchant.password)) {
        const token = jwt.sign(
            { id: merchant.id, email: merchant.email },
            process.env.JWT_SECRET as string,
            { expiresIn: "1d" }
        );
        return res.json({ token });
    }
    res.status(401).json({ message: "Invalid credentials" });
};
export const logoutMerchant = async (req: Request, res: Response) => {
    try {
        const { refreshToken } = req.body;
        await db("refresh_tokens").where({ token: refreshToken }).del();
        res.status(200).json({ message: "Logged out successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error logging out" });
    }
};
