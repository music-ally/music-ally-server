import mongoose from "mongoose";
import user_info from "../dto/user/user_info";

const users_schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  nickname: {
    type: String,
    required: true,
  },
  birthday: {
    type: String,
    required: true,
  },
  sex: {
    type: Boolean,
    required: true,
  },
  profile_image: {
    type: String,
    required: false,
  },
  noti_allow: {
    type: Boolean,
    required: false,
    default: true,
  },
  homearea: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "areas",
  },
  is_social: {
    type: Boolean,
    required: true,
    default: false // true = 소셜로그인, false = 정석로그인
  },
});

const Users = mongoose.model<user_info & mongoose.Document>("users", users_schema);
export default Users;
