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
  actor_id:{
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'castings',
    field: 'actors_id'
  },
  content: {
    type: String,
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

const Reviews = mongoose.model<mongoose.Document>("reviews", reviews_schema);
export default Reviews;