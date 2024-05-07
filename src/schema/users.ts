import mongoose from "mongoose";

const users_schema = new mongoose.Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
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
    type: Date,
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
  // areas 스키마를 아직 안만든 관계로 일단 FK는 주석처리 해뒀음
  // homearea:{
  //     type: mongoose.Types.ObjectId,
  //     require: true,
  //     ref: 'areas'
  // }
});

export default mongoose.model("users", users_schema);
