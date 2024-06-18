import mongoose from "mongoose";

export interface notification_info {
  user_id: mongoose.Types.ObjectId;
  type: string;
  create_at: Date;
  review_id?: mongoose.Types.ObjectId;
  follow_id?: mongoose.Types.ObjectId;
}