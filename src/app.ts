import express from "express";
import authRoutes from "./modules/auth/auth.routes.js";
import transactionRoutes from "./modules/transaction/transaction.routes.js";

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/transaction", transactionRoutes);

export default app;
