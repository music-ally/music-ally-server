import mongoose from "mongoose";

export default interface review_info {
  user_id: mongoose.Types.ObjectId;
  musical_id: mongoose.Types.ObjectId;
  actor_id: mongoose.Types.ObjectId;
  content: string;
  watch_at: Date;
  create_at: Date;
  like_num: Number;
  fear: Number;
  sensitivity: Number;
  violence: Number;
}
