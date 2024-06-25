import mongoose from "mongoose";

export interface review_update_dto {
    actor_ids: mongoose.Types.ObjectId[];
    fear: number;
    sensitivity: number;
    violence: number;
    content: string; //리뷰 내용
}