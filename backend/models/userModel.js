// models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
    },

    // Personalization (per user)
    theme: {
      type: String,
      default: "dark",
    },

    fontSize: {
      type: Number,
      default: 14,
    },

    // Solo editor settings
    personalSettingsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Settings",
    },

    // Currently active settings (solo OR room)
    activeSettingsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Settings",
    },
    // Null = solo, roomId = user inside room
    currentRoomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
