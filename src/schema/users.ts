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
  homearea:{
      type: mongoose.Types.ObjectId,
      require: true,
      ref: 'areas'
  }
});

export default mongoose.model("users", users_schema);
