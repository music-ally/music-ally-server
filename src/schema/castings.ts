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

export default mongoose.model("castings", castings_schema);
