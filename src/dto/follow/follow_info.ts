import mongoose from "mongoose";

export interface follow_info {
  from_user_id: mongoose.Types.ObjectId;
  to_user_id: mongoose.Types.ObjectId;
}