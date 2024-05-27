import mongoose from "mongoose";

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
  theater: {
    type: String,
    required: true,
    default: "미정",
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

const Musicals = mongoose.model<mongoose.Document>("musicals", musicals_schema);
export default Musicals;
