import mongoose from "mongoose";
import { musical_main_response_dto } from "./musical_main_response";

//팔로우가 리뷰를 작성한 뮤지컬 DTO
export interface musical_main_follow_response_dto extends musical_main_response_dto{
    follow_name: string;
}