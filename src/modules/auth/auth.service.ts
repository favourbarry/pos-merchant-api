import jwt from "jsonwebtoken";
import { v4 as uuid } from "uuid";
import db from "../../config/db.js";

const generateAccessToken = (payload: object) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET!, {
        expiresIn: "15m",
    });
};

const generateRefreshToken = async (merchantId: string) => {
    const token = jwt.sign(
        { id: merchantId },
        process.env.JWT_REFRESH_SECRET!,
        { expiresIn: "7d" }
    );
    await db("refresh_tokens").insert({
        id: uuid(),
        merchant_id: merchantId,
        token,
        expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });
    return token;
};

export const loginService = async (merchant: any) => {
    const payload = { id: merchant.id, email: merchant.email };
    const accessToken = generateAccessToken(payload);
    const refreshToken = await generateRefreshToken(merchant.id);
    return { accessToken, refreshToken };
};

export const refreshTokenService = async (token: string) => {
    const decoded: any = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
    const stored = await db("refresh_tokens")
        .where({ token, is_revoked: false })
        .first();
    if (!stored) throw new Error("Invalid refresh token");
    return generateAccessToken({ id: decoded.id });
};

export const logoutService = async (token: string) => {
    await db("refresh_tokens")
        .where({ token })
        .update({ is_revoked: true });
};
