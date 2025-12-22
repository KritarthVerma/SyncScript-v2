// utils/userHelpers.js
import User from "../models/userModel.js";

export const updateUserRoom = async (userId, currentRoomId, activeSettingsId) => {
  await User.findByIdAndUpdate(userId, {
    currentRoomId,
    activeSettingsId
  });
};
