import mongoose from "mongoose";
import { actor_info } from "../dto/actor/actor_info";

const actors_schema = new mongoose.Schema({
  actor_playdb_id:{
    type: Number,
    required: true,
  },
  actor_name: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    required: false,
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
  debut: {
    type: String,
    required: false,
  },
  job: {
    type: String,
    required: false,
    default: '뮤지컬배우'
  },
  view: {
    type: Number,
    required: true,
    default: 0
  }
});

const Actors = mongoose.model<actor_info & mongoose.Document>("actors", actors_schema);
export default Actors;
