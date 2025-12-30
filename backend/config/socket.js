import { Server } from "socket.io";

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

        // Join socket room
        socket.join(roomId);

        // --- DB UPDATES ---
        // 1️⃣ Add user to room participants (avoid duplicates)
        if (!room.participants.includes(userId)) {
            room.participants.push(userId);
            await room.save();
        }

        // 2️⃣ Update user's currentRoomId + sync active settings
        user.currentRoomId = roomId;
        user.activeSettingsId = room.settingsId;   // or assign actual settings object
        await user.save();

        // --- BROADCAST EVENTS ---
        // Notify others that someone joined
        socket.to(roomId).emit("user-joined", {
            name : user.name,
        });

        socket.emit("join-room-success", {
            room,
            user,
        });

        console.log(`${user.name} joined room ${roomId}`);
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
