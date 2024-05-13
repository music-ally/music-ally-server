import mongoose from "mongoose";

const reviews_schema = new mongoose.Schema({
  user_id:{
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'users'
  },
  musical_id:{
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'musicals'
  },
  actor_id:{ ////////////////////////////////////////////
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'actors'
  },
  content: {
    type: Text,
    require: true,
  },
  watch_at: {
    type: Date,
    require: true,
  },
  created_at: {
    type: Date,
    require: true,
  },
  like_num: {
    type: Number,
    require: true,
    default: 0
  },
  fear: {
    type: Number,
    require: true,
    default: 0
  },
  sensitivity: {
    type: Number,
    require: true,
    default: 0
  },
  violence: {
    type: Number,
    require: true,
    default: 0
  },
  
});

export default mongoose.model("reviews", reviews_schema);
