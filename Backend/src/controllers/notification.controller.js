import { Notification } from "../models/notification.model.js";

// Create a Notification
export const createNotification = async (req, res) => {
  try {
    const { message, type } = req.body;

    const newNotification = new Notification({
      userId: req.user.id,
      message,
      type,
    });

    await newNotification.save();

    res.status(201).json({
      message: "Notification created successfully",
      notification: newNotification,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating notification", error });
  }
};

// Get All Notifications for a User
export const getUserNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ userId: req.user.id }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      message: "Notifications fetched successfully",
      notifications,
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching notifications", error });
  }
};

// Mark a Notification as Seen
export const markNotificationAsSeen = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.seen = true;
    await notification.save();

    res.status(200).json({ message: "Notification marked as seen", notification });
  } catch (error) {
    res.status(500).json({ message: "Error updating notification", error });
  }
};

// Delete a Notification
export const deleteNotification = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    await Notification.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Notification deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notification", error });
  }
};

// Mark All Notifications as Seen
export const markAllNotificationsAsSeen = async (req, res) => {
  try {
    await Notification.updateMany({ userId: req.user.id, seen: false }, { seen: true });

    res.status(200).json({ message: "All notifications marked as seen" });
  } catch (error) {
    res.status(500).json({ message: "Error updating notifications", error });
  }
};

// Delete All Notifications for a User
export const deleteAllNotifications = async (req, res) => {
  try {
    await Notification.deleteMany({ userId: req.user.id });

    res.status(200).json({ message: "All notifications deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting notifications", error });
  }
};
