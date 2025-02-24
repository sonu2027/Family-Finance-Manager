import express from "express";
import {
  createNotification,
  getUserNotifications,
  markNotificationAsSeen,
  deleteNotification,
  markAllNotificationsAsSeen,
  deleteAllNotifications,
} from "../controllers/notification.controller.js";
import {verifyToken} from "../middlewares/verifyToken.middleware.js";

const router = express.Router();

router.post("/createnotification", verifyToken, createNotification);
router.get("/getusernotifications", verifyToken, getUserNotifications);
router.put("/marknotificationssseen/:id", verifyToken, markNotificationAsSeen);
router.delete("/deletenotification/:id", verifyToken, deleteNotification);
router.put(
  "/markallnotificationsssseen",
  verifyToken,
  markAllNotificationsAsSeen
);
router.delete("/deleteallnotifications", verifyToken, deleteAllNotifications);

export default router;
