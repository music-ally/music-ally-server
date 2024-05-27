import mongoose from "mongoose";

const actors_schema = new mongoose.Schema({
  actor_name: {
    type: String,
    required: true,
  },
  profile_image: {
    type: String,
    required: true,
  },
  birthday: {
    type: Date,
    required: false,
  },
  agency: {
    type: String,
    required: false,
  },
  physical: {
    type: String,
    required: false,
  },
  job: {
    type: String,
    required: false,
  },
});

const Actors = mongoose.model<mongoose.Document>("actors", actors_schema);
export default Actors;
