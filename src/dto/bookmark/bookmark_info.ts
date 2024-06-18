import mongoose from "mongoose";

export interface bookmark_info {
  user_id: mongoose.Types.ObjectId;
  musical_id: mongoose.Types.ObjectId;
}
