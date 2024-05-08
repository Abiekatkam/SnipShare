import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    from: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    to: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    type: {
      type: String,
      required: true,
      enum: ["follow", "like", "comment"],
    },
    read: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }, {
    capped: { size: 1024 },
    bufferCommands: false,
    autoCreate: false // disable `autoCreate` since `bufferCommands` is false
  }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
