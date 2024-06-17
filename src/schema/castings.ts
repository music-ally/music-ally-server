import mongoose from "mongoose";
import casting_info from "../dto/casting/casting_info";

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

const Castings = mongoose.model<casting_info & mongoose.Document>("castings", castings_schema);
export default Castings;
