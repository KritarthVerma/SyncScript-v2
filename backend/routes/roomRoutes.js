import express from "express";
import { authMiddleware } from "../controllers/authControllers.js";
import { createRoom } from "../controllers/roomControllers.js";

const router = express.Router();

router.post("/create", authMiddleware, createRoom);

export default router;
