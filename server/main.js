import path from "path";
import express from "express";
import dotenv from "dotenv";
import connectMongoDB from "./database/connectionDb.js";
import cookieParser from "cookie-parser";
import { v2 as cloudinary } from "cloudinary";

// endpoint entries
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import postRoutes from "./routes/post.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

// configuration
dotenv.config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const application = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();


application.use(express.json({
  limit: '50mb'
}));
application.use(express.urlencoded({ extended: true }));

application.use(cookieParser());

// end points
application.use("/api/auth", authRoutes);
application.use("/api/users", userRoutes);
application.use("/api/posts", postRoutes);
application.use("/api/notifications", notificationRoutes);

if(process.env.NODE_ENV === "production"){
  application.use(express.static(path.join(__dirname,"/client/dist")));

  application.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname,"client", "dist", "index.html"))
  })
}


application.listen(PORT, () => {
  console.log(`server is running on port ${PORT} `);
  connectMongoDB();
});
