import mongoose from "mongoose";

const musicals_schema = new mongoose.Schema({
  musical_name: {
    type: String,
    require: true,
  },
  start_at: {
    type: Date,
    require: true,
    default: new Date(),
  },
  end_at: {
    type: Date,
    require: true,
    default: new Date(),
  },
  theater: {
    type: String,
    require: true,
    default: "미정",
  },
  poster_uri: {
    type: String,
    require: true,
  },
  area_id: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "areas",
  },
});

const Musicals = mongoose.model<mongoose.Document>("musicals", musicals_schema);
export default Musicals;