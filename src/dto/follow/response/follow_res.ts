import mongoose from "mongoose";

export interface follow_res_dto {
    follow_list: follow_item_dto[];
}

export interface follow_item_dto {
    user_id: mongoose.Types.ObjectId;
    nickname: string;
    email: string; 
    both_follow: boolean; // 맞팔 여부 T:맞팔o F:맞팔x
}

