// controllers/roomController.js
import Room from "../models/roomModel.js";
import Editor from "../models/editorModel.js";
import User from "../models/userModel.js";

export const createRoom = async (req, res) => {
  try {
    const userId = req.userId;   // coming from auth middleware
    const { roomId, password } = req.body;

    if (!roomId || !password) {
      return res.status(400).json({ message: "Room id and password is required" });
    }

    // 1️⃣ Create default settings for this room
    const roomSettings = await Editor.create({
      language: "cpp",
      code: "// Welcome to SyncScript Room"
    });

    // 2️⃣ Create room
    const room = await Room.create({
      externalId : roomId,
      password: password,
      participants : [userId],
      settingsId: roomSettings._id
    });

    // 3️⃣ Update user → user is now inside this room
    await User.findByIdAndUpdate(userId, {
      activeSettingsId: roomSettings._id
    });

    res.status(201).json({
      message: "Room created successfully",
      room
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error while creating room" });
  }
};
