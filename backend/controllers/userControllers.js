import User from "../models/userModel.js";
import Editor from "../models/editorModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const defaultSettings = await Editor.create({});

    const hashedPassword = await bcrypt.hash(password, 10);

    let user = await User.create({
      name,
      email,
      password: hashedPassword,
      personalSettingsId: defaultSettings._id,
      activeSettingsId: defaultSettings._id,
      currentRoomId: null,
    });

    user = await User.findById(user._id)
      .select("-password")
      .populate("personalSettingsId")
      .populate("activeSettingsId");

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,      // prevents JS access (XSS protection)
        secure: true,        // true in production (HTTPS)
        sameSite: "none",    // required if frontend and backend are on different domains
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    return res.status(201).json({
      message: "Signup successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        theme: user.theme,
        fontSize: user.fontSize,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password)
      return res.status(400).json({ message: "Email & password required" });

    // Find user
    const user = await User.findOne({ email }).populate("personalSettingsId").populate("activeSettingsId");
    if (!user)
      return res.status(400).json({ message: "User does not exist" });

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
        httpOnly: true,      // prevents JS access (XSS protection)
        secure: true,        // true in production (HTTPS)
        sameSite: "none",    // required if frontend and backend are on different domains
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password").populate("personalSettingsId").populate("activeSettingsId");

    if (!user) return res.status(404).json({ message: "User not found" });
    console.log('Fetched user data:', user);
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateTheme = async (req, res) => {
  try {
    const { theme } = req.body;
    if (!theme) return res.status(400).json({ message: "Theme required" });

    const user = await User.findByIdAndUpdate(
      req.userId,
      { theme },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Theme updated",
      theme: user.theme
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateFontSize = async (req, res) => {
  try {
    const { fontSize } = req.body;
    if (!fontSize) return res.status(400).json({ message: "Font size required" });

    const user = await User.findByIdAndUpdate(
      req.userId,
      { fontSize },
      { new: true }
    ).select("-password");

    res.status(200).json({
      message: "Font size updated",
      fontSize: user.fontSize
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,     // false in dev (http), true in prod (https)
      sameSite: "none", // match whatever you used while setting cookie
    });

    return res.status(200).json({ message: "Logged out successfully" });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

