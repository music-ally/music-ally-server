import mongoose from "mongoose";

export interface follow_res_dto {
    followings: follow_item_dto[];
}

export interface follow_item_dto {
    user_id: mongoose.Types.ObjectId;
    nickname: string;
    email: string; 
    is_following: boolean; // 내가 상대방을 팔로우하고 있는지 여부
    is_follower: boolean; // 상대방이 나를 팔로우하고 있는지 여부
}

