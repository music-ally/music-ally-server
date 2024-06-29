import mongoose from "mongoose";

export interface actor_search_res_dto {
    actors: actor_search_item_dto[];
}

export interface actor_search_item_dto {
    actor_id: mongoose.Types.ObjectId;
    profile_image?: string;
    actor_name: string;
    agency?: string;
    birthday?: string;
}

