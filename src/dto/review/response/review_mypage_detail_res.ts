import mongoose from "mongoose";

//마이페이지 리뷰 모달 DTO
export interface review_mypage_detail_res_dto {
    review_id: mongoose.Types.ObjectId;
    poster_image: string;
    musical_name: string;
    fear: number;
    sensitivity: number;
    violence: number;
    content: string;
}
