import { Router } from "express";
import { registerUser, loginMerchant, logoutMerchant } from "./auth.controller.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginMerchant);
router.post("/logout", logoutMerchant);
export default router;
