import mongoose from "mongoose";

const follows_schema = new mongoose.Schema({
  from_user_id:{
       type: mongoose.Types.ObjectId,
       require: true,
       ref: 'users'
  },
  to_user_id:{
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'users'
  }
});

export default mongoose.model("follows", follows_schema);
