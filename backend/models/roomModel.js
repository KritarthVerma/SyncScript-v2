import mongoose from "mongoose";

const roomSchema = new mongoose.Schema(
  {
    // Public sharable room id (like code)
    externalId: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true, 
    },

    // Users associated with this room
    participants: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Shared language + code state
    roomSettingsId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Settings",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Room", roomSchema);
