import mongoose from "mongoose";
import { review_profile_res_dto } from "../../review/response/review_profile_res";
import { musical_profile_res_dto } from "../../musical/response/musical_profile_res";

export interface user_profile_res_dto {
    profile_image: string;
    nickname: string;
    email: string; //마스킹 안된 전체 이메일
    following_num: number; //내가 팔로우한 사람 수
    follower_num: number; //나를 팔로우하는 사람 수
    review_num: number;
    bookmark_num: number;
    is_following: string; // 내가 상대방을 팔로우하고 있는지 여부
    reviews: review_profile_res_dto;
    bookmarks: musical_profile_res_dto;
}
