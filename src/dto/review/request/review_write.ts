import mongoose from "mongoose";

export interface review_write_dto {
    musical_id: mongoose.Types.ObjectId;
    actor_ids: mongoose.Types.ObjectId[];
    fear: number;
    sensitivity: number;
    violence: number;
    content: string; //리뷰 내용
}