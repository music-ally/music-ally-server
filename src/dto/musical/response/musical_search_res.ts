import mongoose from "mongoose";

export interface musical_search_res_dto {
    musicals: musical_search_item_dto[];
}

export interface musical_search_item_dto {
    musical_id: mongoose.Types.ObjectId;
    poster_image: string;
    musical_name: string;
    start_at: string;
    end_at: string;
    theater_name: string;
}

