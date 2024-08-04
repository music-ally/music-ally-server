import mongoose from "mongoose";
import {review_info} from "../dto/review/review_info";

const reviews_schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
  musical_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "musicals",
  },
  actor_ids: [{
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "castings",
  }],
  content: {
    type: String,
    required: true,
  },
  watch_at: {
    type: Date,
    required: false,
  },
  create_at: {
    type: Date,
    required: true,
  },
  fear: {
    type: Number,
    required: true,
    default: 0,
  },
  sensitivity: {
    type: Number,
    required: true,
    default: 0,
  },
  violence: {
    type: Number,
    required: true,
    default: 0,
  },
});

const Reviews = mongoose.model<review_info & mongoose.Document>("reviews", reviews_schema);
export default Reviews;
