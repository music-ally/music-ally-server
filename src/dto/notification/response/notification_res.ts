import mongoose from "mongoose";

export interface notification_res_dto {
  notifications: notification_item_dto[];
}

export interface notification_item_dto {
  notification_id: mongoose.Types.ObjectId;
  type: string;
  create_at: Date;
  review_id?: mongoose.Types.ObjectId;
  poster_image?: string;
  musical_name?: string;
  review_like_nickname?: string;
  review_like_image?: string[];
  review_like_num?: number;
  follower_id?: mongoose.Types.ObjectId;
  follower_image?: string;
  follower_nickname?: string;
  is_followed?: boolean; //내가 팔로우 하고 있는지 여부
}