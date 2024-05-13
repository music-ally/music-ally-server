import mongoose from "mongoose";

const castings_schema = new mongoose.Schema({
  actor_id:{
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'actors'
  },
  musical_id:{
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'musicals'
  },
  role:{
    type: String,
    require: false,
  },
});

const Castings = mongoose.model<mongoose.Document>("castings", castings_schema);
export default Castings;