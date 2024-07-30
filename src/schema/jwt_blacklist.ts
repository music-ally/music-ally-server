import mongoose from "mongoose";


interface blacklist_info {
  token: string;
  expire_at: Date;
}


const blacklist_schema = new mongoose.Schema({
  token: {
    type: String,
    required: true,
  },
  expire_at: {
    type: Date,
    required: true,
  },
});

const Blacklists = mongoose.model<blacklist_info & mongoose.Document>("blacklists", blacklist_schema);
export default Blacklists;
