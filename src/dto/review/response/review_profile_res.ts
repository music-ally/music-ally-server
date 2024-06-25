import mongoose from "mongoose";

export interface review_profile_res_dto {
    reviews: review_profile_item_dto[];
}

export interface review_profile_item_dto {
    review_id: mongoose.Types.ObjectId;
    poster_image: string;
}
