import mongoose from "mongoose";
import { musical_main_res_dto } from "./musical_main_res";

//나랑 같은 성별이 많이 찜한/리뷰한 뮤지컬 DTO
export interface musical_main_sex_res_dto extends musical_main_res_dto{
    sex: string;
}