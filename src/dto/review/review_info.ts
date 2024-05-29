import mongoose from "mongoose";

// 리뷰 기본 정보
export interface review_info {
  user_id: mongoose.Types.ObjectId;
  musical_id: mongoose.Types.ObjectId;
  actor_id: mongoose.Types.ObjectId;
  content: string;
  watch_at: Date;
  created_at: Date;
  like_num: Number;
  fear: Number;
  sensitivity: Number;
  violence: Number;
}
