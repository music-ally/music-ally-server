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

review_likes_schema.index({ user_id: 1, review_id: 1 }, { unique: true });

const Review_likes = mongoose.model("review_likes", review_likes_schema);
export default Review_likes;