import Notification from "../models/notification.models.js";

export const getNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    const notifications = await Notification.find({ to: userId }).populate({
      path: "from",
      select: "fullname username profileImage createdAt",
    });

    await Notification.updateMany({ to: userId }, { read: true });

    return res.status(201).json({
      status: "success",
      message: "fetched all notifications",
      data: notifications,
    });
  } catch (error) {
    console.log(
      `getNotifications Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const deleteNotifications = async (req, res) => {
  try {
    const userId = req.user._id;
    await Notification.deleteMany({ to: userId });

    return res.status(201).json({
      status: "success",
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    console.log(
      `deleteNotifications Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};

export const deleteSingleNotification = async (req, res) => {
  try {
    const userId = req.user._id;
    const { notifyId } = req.body;

    const notification = await Notification.findById(notifyId);

    if (!notification) {
      res.status(404).json({
        status: "error",
        message: "No notification found",
      });
    }

    if (notification?.to.toString() !== userId.toString()) {
      res.status(404).json({
        status: "error",
        message: "You don't have this access.",
      });
    }

    await Notification.findByIdAndDelete(notifyId);
    return res.status(201).json({
      status: "success",
      message: "Notification deleted successfully.",
    });
  } catch (error) {
    console.log(
      `deleteSingleNotification Controller : Something went wrong. ${error.message}`
    );
    res.status(500).json({
      status: "error",
      message: "Internal Server Error",
    });
  }
};
