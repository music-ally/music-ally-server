import mongoose from "mongoose";

export interface review_like_info {
  user_id: mongoose.Types.ObjectId;
  review_id: mongoose.Types.ObjectId;
}
