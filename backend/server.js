import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./database/db.js";
import authRoutes from "./routes/auth-routes.js";
import cookieParser from "cookie-parser";
import path from "path";

dotenv.config();

if (!process.env.CLIENT_URL) {
  console.error("CLIENT_URL is not defined in .env");
  process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname = path.resolve();

app.use(cors({
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
}));
app.use(express.json());
app.use(cookieParser());



app.use('/api/auth', authRoutes);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/dist", "index.html"));
  });
}

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
}).catch((error) => {
  console.error("Failed to connect to database:", error);
  process.exit(1);
});