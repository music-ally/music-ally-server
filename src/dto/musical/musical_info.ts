import mongoose from "mongoose";

export default interface musical_info {
  musical_name: string;
  start_at: Date;
  end_at: Date;
  theater_id: mongoose.Types.ObjectId;
  poster_uri: string;
  area_id: mongoose.Types.ObjectId;
}
