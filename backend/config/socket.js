import { Server } from "socket.io";
import Room from "../models/roomModel.js";
import User from "../models/userModel.js";

export const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: process.env.FRONTEND_URL,
      credentials: true
    }
  });

  io.on("connection", (socket) => {
    console.log("🟢 Client connected:", socket.id);

    socket.on("join-room", async ({ roomId, userId }) => {
      try {
        const user = await User.findById(userId);
        const room = await Room.findById(roomId);
        if (!room || !user) return;

        socket.join(roomId);

        socket.to(roomId).emit("user-joined", {
          userId,
          name: user.name
        });

        socket.emit("join-room-success", {
          room,
          user
        });

        console.log(`${user.name} with id ${userId} joined room ${roomId}`);
      } catch (err) {
        console.log("Join Room Error:", err);
        socket.emit("join-room-failed");
      }
    });

    socket.on("disconnect", () => {
      console.log("🔴 Client disconnected:", socket.id);
    });
  });

  return io;
};
