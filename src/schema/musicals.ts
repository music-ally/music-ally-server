import mongoose from "mongoose";
import musical_info from "../dto/musical/musical_info";

const musicals_schema = new mongoose.Schema({
  musical_name: {
    type: String,
    required: true,
  },
  start_at: {
    type: Date,
    required: true,
    default: new Date(),
  },
  end_at: {
    type: Date,
    required: true,
    default: new Date(),
  },
  theater_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "theaters"
  },
  poster_uri: {
    type: String,
    required: true,
  },
  area_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "areas",
  },
});

const Musicals = mongoose.model<musical_info & mongoose.Document>("musicals", musicals_schema);
export default Musicals;
