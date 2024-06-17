import mongoose from "mongoose";

export default interface casting_info {
  actor_id: mongoose.Types.ObjectId;
  musical_id: mongoose.Types.ObjectId;
  role?: String;
}
