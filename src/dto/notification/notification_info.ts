import mongoose from "mongoose";

export default interface notification_info {
  user_id: mongoose.Types.ObjectId;
  type: String;
  created_at: Date;
  review_id?: mongoose.Types.ObjectId;
  follow_id?: mongoose.Types.ObjectId;
}