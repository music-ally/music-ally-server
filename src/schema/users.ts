import mongoose from "mongoose";
import {user_info} from "../dto/user/user_info";

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
    unique: true,
  },
  birthday: {
    type: Date,
    required: true,
  },
  sex: {
    type: Boolean, // true = 여성, false = 남성
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
  is_active: {
    type: Boolean,
    required: true,
    default: true
  },
  delete_date: {
    type: Date,
    required: false,
  },
});

const Users = mongoose.model<user_info & mongoose.Document>("users", users_schema);
export default Users;
