import mongoose from "mongoose";
import { musical_main_res_dto } from "./musical_main_res";

//팔로우가 리뷰를 작성한 뮤지컬 DTO
export interface musical_main_follow_res_dto extends musical_main_res_dto{
    follow_name: string;
}