import mongoose from "mongoose";
import theater_info from "../dto/theater/theater_info";

const theaters_schema = new mongoose.Schema({
  theater_name: {
    type: String,
    required: true,
  },
  theater_address: {
    type: String,
    required: true,
  },
  area_id: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "areas",
  }
});

const Theaters = mongoose.model<theater_info & mongoose.Document>("theaters", theaters_schema);
export default Theaters;