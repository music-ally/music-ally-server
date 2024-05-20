import mongoose, { mongo } from "mongoose";

const users_schema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: false,
  },
  nickname: {
    type: String,
    require: true,
  },
  birthday: {
    type: String,
    require: true,
  },
  sex: {
    type: Boolean,
    require: true,
  },
  profile_image: {
    type: String,
    require: false,
  },
  noti_allow: {
    type: Boolean,
    require: false,
    default: true,
  },
  homearea: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "areas",
  },
  is_social: {
    type: Boolean,
    require: true, // true = 소셜, false = 기본
  },
});

const Users = mongoose.model<mongoose.Document>("users", users_schema);
export default Users;
