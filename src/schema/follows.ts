import mongoose from "mongoose";
import {follow_info} from "../dto/follow/follow_info";

const follows_schema = new mongoose.Schema({
  from_user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
  to_user_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "users",
  },
});

follows_schema.index({ from_user_id: 1, to_user_id: 1 }, { unique: true });

const Follows = mongoose.model<follow_info & mongoose.Document>("follows", follows_schema);
export default Follows;
