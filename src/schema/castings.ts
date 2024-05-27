import mongoose from "mongoose";

const castings_schema = new mongoose.Schema({
  actor_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "actors",
  },
  musical_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "musicals",
  },
  role: {
    type: String,
    required: false,
  },
});

const Castings = mongoose.model<mongoose.Document>("castings", castings_schema);
export default Castings;
