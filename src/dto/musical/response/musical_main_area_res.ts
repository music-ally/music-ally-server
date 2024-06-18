import mongoose from "mongoose";
import { musical_main_res_dto } from "./musical_main_res";

//나의 거주지 지역에서 열리는 뮤지컬 DTO
export interface musical_main_area_res_dto extends musical_main_res_dto{
    area: string;
}