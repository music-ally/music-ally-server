import mongoose from "mongoose";

const notifications_schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "users",
  },
  type: {
    type: String,
    require: true,
    default: "번외",
  },
  created_at: {
    type: Date,
    require: true,
    default: new Date(),
  },
  review_id: {
    type: mongoose.Types.ObjectId,
    require: false,
    ref: "reviews",
  },
  follow_id: {
    type: mongoose.Types.ObjectId,
    require: false,
    ref: "follows",
  },
});

const Notifications = mongoose.model("notifications", notifications_schema);
export default Notifications;