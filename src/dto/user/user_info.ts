import mongoose from "mongoose";

export interface user_info {
  email: string;
  password: string;
  nickname: string;
  birthday: Date;
  sex: boolean;
  profile_image: string;
  noti_allow: boolean;
  homearea: mongoose.Types.ObjectId;
  is_social: boolean;
  is_active: boolean;
  delete_date: Date;
}