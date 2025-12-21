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
      activeSettingsId: roomSettings._id,
      currentRoomId: room._id
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

export const joinRoom = async (req, res) => {
  try {
    const userId = req.userId;
    const { roomId, password } = req.body;

    if (!roomId || !password) return res.status(400).json({ message: "Room ID and password are required" });

    const room = await Room.findOne({ externalId: roomId });
    if (!room) return res.status(404).json({ message: "Room not found" });

    // Check password
    if (room.password !== password) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    if(room.participants.includes(userId)) {
      return res.status(400).json({ message: "User already in the room" });
    }

    // Add user to room participants
    room.participants.push(userId);
    await room.save();

    // Update user state
    await User.findByIdAndUpdate(userId, {
      activeSettingsId: room.settingsId,  // assuming each room has its Settings
      currentRoomId: room._id
    });

    res.status(200).json({
      message: "Joined room successfully",
      room
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const leaveRoom = async (req, res) => {
  try {
    const { externalId } = req.params;
    const userId = req.userId;

    const room = await Room.findOne({ externalId });

    if (!room)
      return res.status(404).json({ message: "Room not found" });

    // Normal member leaving
    room.participants = room.participants.filter(
        id => id.toString() !== userId.toString()
    );

    if (room.participants.length === 0) {
      await Room.findByIdAndDelete(room._id);
    } else {
      await room.save();
    }

    const user = await User.findById(userId);

    // Update user
    await User.findByIdAndUpdate(userId, {
      currentRoomId: null,
      activeSettingsId: user.personalSettingsId   // <-- YOUR PERSONAL SETTINGS FIELD
    });

    res.json({ message: "Left room successfully" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getRoom = async (req, res) => {
  try {
    const { externalId } = req.params;

    const room = await Room.findOne({ externalId })
      .populate("participants", "name") // fetch user info
      .populate("settingsId"); // fetch room settings (language, code)

    if (!room)
      return res.status(404).json({ message: "Room not found" });

    res.status(200).json({
      message: "Room details fetched successfully",
      room
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error while fetching room" });
  }
};