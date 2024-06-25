import mongoose from "mongoose";

//내가 찜한, 타인이 찜한 뮤지컬 불러오기 DTO
export interface musical_profile_res_dto {
    musicals: musical_profile_item_dto[];
}

export interface musical_profile_item_dto {
    musical_id: mongoose.Types.ObjectId;
    poster_image: string;
}

