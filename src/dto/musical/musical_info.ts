import mongoose from "mongoose";

// 뮤지컬 기본 정보
export interface musical_info {
  musical_name: string;
  start_at: Date;
  end_at: Date;
  theater_id: mongoose.Types.ObjectId;
  poster_uri: String;
  area_id: mongoose.Types.ObjectId;
}
