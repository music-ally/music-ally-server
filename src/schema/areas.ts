import mongoose from "mongoose";

const areas_schema = new mongoose.Schema({
  area_name: {
    type: String,
    require: true,
  },
});

const Areas = mongoose.model<mongoose.Document>("areas", areas_schema);
export default Areas;