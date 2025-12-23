import express from "express";
import { signup, login, getMe, updateTheme, updateFontSize, logout } from "../controllers/userControllers.js";
import { authMiddleware } from "../controllers/authControllers.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.patch("/settings/theme", authMiddleware, updateTheme);
router.patch("/settings/font-size", authMiddleware, updateFontSize);
router.post("/logout",authMiddleware, logout);


export default router;
