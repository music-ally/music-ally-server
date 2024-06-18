import mongoose from "mongoose";


export interface review_detail_musical_dto{
    musical_id: mongoose.Types.ObjectId;
    poster_uri: string;
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
export interface review_detail_response_dto{
    review_id: mongoose.Types.ObjectId;
    musical: review_detail_musical_dto;
    actors: review_detail_actor_dto[];
    poster_uri: string;
    reviewer_profile_image: string;
    reviewer_nickname: string;
    reviewer_email: string; //앞의 2글자만 or 2글자외 나머지 마스킹해서 보내기
    //like_num: Number; //리뷰 좋아요 수 와이어프레임엔 없는데 없어도 되는지?
    is_like: boolean; //사용자의 좋아요 여부
    violence: Number;
    fear: Number;
    sensitivity: Number;
    content: string;
}