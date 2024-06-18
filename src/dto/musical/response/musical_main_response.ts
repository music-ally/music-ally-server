import mongoose from "mongoose";

//뮤지컬 메인 화면 공통 DTO
export interface musical_main_response_dto {
    musicals: musical_main_item_dto[];
}

export interface musical_main_item_dto {
    musical_id: mongoose.Types.ObjectId;
    poster_uri: string;
}
