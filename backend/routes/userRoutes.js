import express from "express";
import { signup, login, getMe, updateTheme, updateFontSize } from "../controllers/userControllers.js";
import { authMiddleware } from "../controllers/authControllers.js";

const router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);
router.patch("/settings/theme", authMiddleware, updateTheme);
router.patch("/settings/font-size", authMiddleware, updateFontSize);


export default router;

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

