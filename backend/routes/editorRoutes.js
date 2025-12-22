import express from "express";
import { authMiddleware } from "../controllers/authControllers.js";
import {
  updateUserSettings,
  updateRoomSettings,
} from "../controllers/editorControllers.js";

const router = express.Router();

// 1️⃣ Update personal user settings (theme, fontSize)
router.put("/user", authMiddleware, updateUserSettings);

// 2️⃣ Update room settings (language, code) by room externalId
router.put("/room/:externalId", authMiddleware, updateRoomSettings);

export default router;
