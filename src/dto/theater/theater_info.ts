import mongoose from "mongoose";

export interface theater_info {
  theater_playdb_id: number;
  theater_name: string;
  theater_address?: string;
  theater_road_address?: string;
  area_id: mongoose.Types.ObjectId;
  seats?:string[];
}