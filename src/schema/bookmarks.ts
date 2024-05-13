import mongoose from "mongoose";

const bookmarks_schema = new mongoose.Schema({
  user_id: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "users",
  },
  musical_id: {
    type: mongoose.Types.ObjectId,
    require: true,
    ref: "musicals",
  },
});

bookmarks_schema.index({ user_id: 1, musical_id: 1 }, { unique: true });

const Bookmarks = mongoose.model("bookmarks", bookmarks_schema);

export default Bookmarks; 