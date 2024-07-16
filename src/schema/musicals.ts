import mongoose from "mongoose";
import {musical_info} from "../dto/musical/musical_info";

const musicals_schema = new mongoose.Schema({
  musical_playdb_id:{
    type: Number,
    required: true,
  },
  musical_name: {
    type: String,
    required: true,
  },
  musical_subname: {
    type: String,
    required: false,
  },
  musical_genre:{
    type: String,
    required: false,
  },
  start_at: {
    type: String,
    required: true,
  },
  end_at: {
    type: String,
    required: true,
  },
  theater_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "theaters"
  },
  age_limit: {
    type: String,
    required: false,
  },
  runtime: {
    type: String,
    required: false,
  },
  website: {
    type: String,
    required: false,
  },
  poster_image: {
    type: String,
    required: true,
  },
  view: {
    type: Number,
    required: true,
    default: 0,
  }
});

const Musicals = mongoose.model<musical_info & mongoose.Document>("musicals", musicals_schema);
export default Musicals;
