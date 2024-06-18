import mongoose from "mongoose";
import {theater_info} from "../dto/theater/theater_info";

const theaters_schema = new mongoose.Schema({
  theater_playdb_id:{
    type: Number,
    required: true,
  },
  theater_name: {
    type: String,
    required: true,
  },
  theater_address: {
    type: String,
    required: false,
  },
  theater_road_address: {
    type: String,
    required: false,
  },
  area_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "areas",
  },
  seats:[{
    type: String,
    required: false,
  }] 
});

const Theaters = mongoose.model<theater_info & mongoose.Document>("theaters", theaters_schema);
export default Theaters;