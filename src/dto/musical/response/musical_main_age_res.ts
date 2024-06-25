import mongoose from "mongoose";
import { musical_main_res_dto } from "./musical_main_res";

//나랑 같은 나이대가 많이 찜한/리뷰한 뮤지컬 DTO
export interface musical_main_age_res_dto extends musical_main_res_dto{
    age: number;
}