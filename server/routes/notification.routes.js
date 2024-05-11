import express from "express";
import { restrictedRoute } from "../utility/middleware/restrictedRoute.js";
import {
  deleteNotifications,
  deleteSingleNotification,
  getNotifications,
} from "../controllers/notification.controllers.js";

const router = express.Router();

router.get("/", restrictedRoute, getNotifications);
router.post("/", restrictedRoute, deleteNotifications);
router.post("/single", restrictedRoute, deleteSingleNotification);

export default router;
