// controllers/settingsController.js
import User from "../models/userModel.js";
import Room from "../models/roomModel.js";

// Update personal user settings
export const updateUserSettings = async (req, res) => {
  try {
    const user = await User.findById(req.userId).populate("personalSettingsId");
    if (!user || !user.personalSettingsId)
      return res.status(404).json({ message: "User settings not found" });

    const { language, content } = req.body;
    if (language) user.personalSettingsId.language = language;
    if (content) user.personalSettingsId.content = content;

    await user.personalSettingsId.save();
    res.json({ message: "User settings updated", settings: user.personalSettingsId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update room settings
export const updateRoomSettings = async (req, res) => {
  try {
    const room = await Room.findOne({ externalId: req.params.externalId }).populate("settingsId");
    if (!room || !room.settingsId)
      return res.status(404).json({ message: "Room settings not found" });

    const { language, content } = req.body;
    if (language) room.settingsId.language = language;
    if (content) room.settingsId.content = content;

    await room.settingsId.save();
    res.json({ message: "Room settings updated", settings: room.settingsId });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

