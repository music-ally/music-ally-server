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

follows_schema.index({ from_user_id: 1, to_user_id: 1 }, { unique: true });

const Follows = mongoose.model("follows", follows_schema);
export default Follows;