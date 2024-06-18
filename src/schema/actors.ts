import mongoose from "mongoose";
import { actor_info } from "../dto/actor/actor_info";

const actors_schema = new mongoose.Schema({
  actor_name: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: false,
  },
  agency: {
    type: String,
    required: false,
  },
  physical: {
    type: String,
    required: false,
  },
  job: {
    type: String,
    required: false,
  },
});

const Actors = mongoose.model<actor_info & mongoose.Document>("actors", actors_schema);
export default Actors;
