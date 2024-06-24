import mongoose from "mongoose";

export interface review_update_dto {
    actor_ids: mongoose.Types.ObjectId[];
    fear: Number;
    sensitivity: Number;
    violence: Number;
    content: string; //리뷰 내용
}