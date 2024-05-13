import mongoose from "mongoose";

const review_likes_schema = new mongoose.Schema({
  user_id:{
       type: mongoose.Types.ObjectId,
       require: true,
       ref: 'users'
  },
  review_id:{
    type: mongoose.Types.ObjectId,
    require: true,
    ref: 'reviews'
  }
});

export default mongoose.model("review_likes", review_likes_schema);
