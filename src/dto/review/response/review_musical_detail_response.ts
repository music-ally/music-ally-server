import mongoose from "mongoose";

//뮤지컬 상세 모달 리뷰 DTO
export default interface review_musical_detail_response_dto {
    review_id: mongoose.Types.ObjectId;
    reviewer_profile_image: string;
    reviewer_nickname: string;
    reviewer_email: string; //앞의 2글자만 or 2글자외 나머지 마스킹해서 보내기
    create_at: Date; //리뷰 작성 시간
    like_num: Number; //리뷰 좋아요 수
    is_like: boolean; //사용자의 좋아요 여부
    fear: Number;
    sensitivity: Number;
    violence: Number;
    content: string;
}
