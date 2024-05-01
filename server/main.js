import express from "express";
import dotenv from "dotenv";
// endpoint entries
import authRoutes from "./routes/auth.routes.js";
import connectMongoDB from "./database/connectionDb.js";

dotenv.config();
const application = express();
const PORT = process.env.PORT || 5000;

// end points
application.use("/api/auth/", authRoutes);

application.listen(PORT, () => {
  console.log(`server is running on port ${PORT} `);
  connectMongoDB();
});
