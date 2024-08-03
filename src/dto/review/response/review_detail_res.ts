import mongoose from "mongoose";

export interface review_detail_musical_dto{
    musical_id: mongoose.Types.ObjectId;
    poster_image: string;
    musical_name: string;
    theater_name: string;
    watch_at: Date;
}

export interface review_detail_actor_dto{
    actor_id: mongoose.Types.ObjectId;
    profile_image: string;
    actor_name: string;
}

//리뷰 상세 페이지 DTO
export interface review_detail_res_dto{
    review_id: mongoose.Types.ObjectId;
    musical: review_detail_musical_dto;
    actors: review_detail_actor_dto[];
    poster_image: string;
    reviewer_profile_image: string;
    reviewer_nickname: string;
    reviewer_email: string; //앞의 2글자만 or 2글자외 나머지 마스킹해서 보내기
    like_num: number;
    is_like: boolean; //사용자의 좋아요 여부
    violence: number;
    fear: number;
    sensitivity: number;
    content: string;
    create_at: Date;
}