import express from "express";
import { signup, login } from "../controllers/userControllers.js";
import { authMiddleware } from "../controllers/authControllers.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);

export default router;


// Get user profile
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate("currentRoom");
    if (!user) return res.status(404).json({ message: "User not found" });

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update personalization (theme, fontSize)
router.put("/:id/personalization", async (req, res) => {
  try {
    const { theme, fontSize } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { personalization: { theme, fontSize } },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update solo coding settings (language + content)
router.put("/:id/settings", async (req, res) => {
  try {
    const { language, content } = req.body;

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { settings: { language, content } },
      { new: true }
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

