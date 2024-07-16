import mongoose from "mongoose";

export interface musical_info {
  musical_playdb_id: number;
  musical_name: string;
  musical_subname?: string;
  musical_genre?: string;
  start_at: string;
  end_at: string;
  theater_id: mongoose.Types.ObjectId;
  poster_image: string;
  age_limit?: string;
  runtime?: string;
  website?: string;
  view: number;
}
