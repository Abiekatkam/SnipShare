import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./database/connectionDb.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

// endpoint entries
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";

dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const application = express();
const PORT = process.env.PORT || 5000;

application.use(express.json());
application.use(express.urlencoded({ extended: true }));

application.use(cookieParser());

// end points
application.use("/api/auth", authRoutes);
application.use("/api/users", userRoutes);

application.listen(PORT, () => {
  console.log(`server is running on port ${PORT} `);
  connectMongoDB();
});
