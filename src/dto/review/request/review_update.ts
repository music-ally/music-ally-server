import mongoose from "mongoose";

//리뷰 업데이트 DTO, 수정 범위 회의 후 확인 필요 write와 통용할 수 있음
export interface review_update_dto {
    actor_ids: mongoose.Types.ObjectId[];
    fear: Number;
    sensitivity: Number;
    violence: Number;
    content: string; //리뷰 내용
}