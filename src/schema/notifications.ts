import mongoose from "mongoose";

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
  created_at: {
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

const Notifications = mongoose.model<mongoose.Document>(
  "notifications",
  notifications_schema
);
export default Notifications;
