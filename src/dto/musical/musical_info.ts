import mongoose from "mongoose";

export interface musical_info {
  musical_name: string;
  start_at: Date;
  end_at: Date;
  theater_id: mongoose.Types.ObjectId;
  poster_image: string;
  area_id: mongoose.Types.ObjectId;
}
