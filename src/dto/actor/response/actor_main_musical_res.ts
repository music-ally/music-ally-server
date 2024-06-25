import mongoose from "mongoose";
import { actor_main_res_dto } from "./actor_main_res";

//특정 뮤지컬 출연 배우 DTO
export interface actor_main_musical_res_dto extends actor_main_res_dto{
    musical_name: string;
}