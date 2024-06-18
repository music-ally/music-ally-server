import mongoose from "mongoose";

export interface casting_info {
  actor_id: mongoose.Types.ObjectId;
  musical_id: mongoose.Types.ObjectId;
  role?: string;
}
