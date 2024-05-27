import mongoose, { mongo } from "mongoose";

const users_schema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: false,
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
    default: true // true = 소셜로그인, false = 정석로그인
  },
});

const Users = mongoose.model<mongoose.Document>("users", users_schema);
export default Users;
