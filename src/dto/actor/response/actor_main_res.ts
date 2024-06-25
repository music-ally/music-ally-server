import mongoose from "mongoose";

//배우 메인 화면 공통 DTO
export interface actor_main_res_dto {
    actors: actor_main_item_dto[];
}

export interface actor_main_item_dto {
    actor_id: mongoose.Types.ObjectId;
    profile_image: string;
}

