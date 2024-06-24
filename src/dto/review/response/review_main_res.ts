import mongoose from "mongoose";

export interface review_main_res_dto {
    reviews: review_main_item_dto[];
}

//리뷰 페이지 등 기본 리뷰 컴포넌트 DTO
export interface review_main_item_dto {
    review_id: mongoose.Types.ObjectId;
    poster_image: string;
    reviewer_profile_image: string;
    reviewer_nickname: string;
    reviewer_email: string; //앞의 2글자만 or 2글자외 나머지 마스킹해서 보내기
    create_at: Date; //리뷰 작성 시간
    like_num: Number; //리뷰 좋아요 수
    is_like: boolean; //사용자의 좋아요 여부
    fear: number;
    sensitivity: number;
    violence: number;
    content: string;
}
