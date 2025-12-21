import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import cookieParser from "cookie-parser";
import roomRoutes from './routes/roomRoutes.js';
//import editorRoutes from './routes/editorRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors()); //Enables Cross-Origin Resource Sharing so your backend can accept requests from different domains
app.use(express.json()); //Parses incoming JSON request bodies and makes the data available in req.body.
app.use(cookieParser()); // Parses cookies from incoming requests and makes them available in req.cookies.

// Middleware to log requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Central routing middleware
app.use("/api/user", userRoutes);
app.use("/api/room", roomRoutes);
//app.use("/api/editor", editorRoutes);

//Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));