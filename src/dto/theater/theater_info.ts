import mongoose from "mongoose";

export default interface theater_info {
  theater_name: string;
  theater_address: string;
  area_id: mongoose.Types.ObjectId;
}