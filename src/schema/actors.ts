import mongoose from "mongoose";

const actors_schema = new mongoose.Schema({
  actor_name:{
       type: String,
       require: true,
  },
  progile_image:{
    type: String,
    require: true,
  },
  birthday:{
    type: Date,
    require: false,
  },
  agency:{
    type: String,
    require: false,
  },
  physical:{
    type: String,
    require: false,
  },
  job:{
    type: String,
    require: false,
  }
});

export default mongoose.model("actors", actors_schema);
