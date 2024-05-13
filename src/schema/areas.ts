import mongoose from "mongoose";

const areas_schema = new mongoose.Schema({
  area_name: {
    type: String,
    require: true,
  },
});

export default mongoose.model("areas", areas_schema);
