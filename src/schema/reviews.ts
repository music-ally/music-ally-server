import mongoose from "mongoose";

const follows_schema = new mongoose.Schema({
  // areas 스키마를 아직 안만든 관계로 일단 FK는 주석처리 해뒀음
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
