import mongoose from "mongoose";
import {area_info} from "../dto/area/area_info";

const areas_schema = new mongoose.Schema({
  area_playdb_id: {
    type: String,
    required: true
  },
  area_name: {
    type: String,
    required: true,
  },
});

const Areas = mongoose.model<area_info & mongoose.Document>("areas", areas_schema);
export default Areas;
