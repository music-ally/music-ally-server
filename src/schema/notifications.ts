import mongoose from "mongoose";
import {notification_info} from "../dto/notification/notification_info";

const notifications_schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
  type: {
    type: String,
    required: true,
    default: "번외",
  },
  create_at: {
    type: Date,
    required: true,
    default: new Date(),
  },
  review_id: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "reviews",
  },
  follow_id: {
    type: mongoose.Types.ObjectId,
    required: false,
    ref: "follows",
  },
});

const Notifications = mongoose.model<notification_info & mongoose.Document>(
  "notifications",
  notifications_schema
);
export default Notifications;
