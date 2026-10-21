import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
import authRoutes from "./routes/auth.routes.js";
import fileRoutes from "./routes/file.routes.js";
const app = express();
// Connect to database
connectDB();
// Middleware
app.use(express.json());
// Routes
app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});