import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors()); //Enables Cross-Origin Resource Sharing so your backend can accept requests from different domains
app.use(express.json()); //Parses incoming JSON request bodies and makes the data available in req.body.

//Test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Server
const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));