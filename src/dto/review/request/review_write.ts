import mongoose from "mongoose";

export interface review_write_dto {
    musical_id: mongoose.Types.ObjectId;
    actor_ids: mongoose.Types.ObjectId[];
    fear: Number;
    sensitivity: Number;
    violence: Number;
    content: string; //리뷰 내용
}