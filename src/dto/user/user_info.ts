import mongoose from "mongoose";

export default interface user_info {
  email: string;
  password: string;
  nickname: string;
  birthday: Date;
  sex: Boolean;
  profile_image: string;
  noti_allow: boolean;
  homearea: mongoose.Types.ObjectId;
  is_social: boolean;
}