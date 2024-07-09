import mongoose from "mongoose";

export interface review_info {
  user_id: mongoose.Types.ObjectId;
  musical_id: mongoose.Types.ObjectId;
  actor_id: mongoose.Types.ObjectId;
  content: string;
  watch_at: Date;
  create_at: Date;
  fear: number;
  sensitivity: number;
  violence: number;
}
