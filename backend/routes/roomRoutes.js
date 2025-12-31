import express from "express";
import { authMiddleware } from "../controllers/authControllers.js";
import { createRoom, joinRoom, leaveRoom, getRoom } from "../controllers/roomControllers.js";

const router = express.Router();

router.post("/create", authMiddleware, createRoom);
router.post("/join", authMiddleware, joinRoom);
router.post("/leave", authMiddleware, leaveRoom);
router.get("/:externalId", authMiddleware, getRoom);

export default router;
