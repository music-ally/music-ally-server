import mongoose from "mongoose";
import { musical_main_res_dto } from "./musical_main_res";

//특정 배우의 뮤지컬 DTO
export interface musical_main_actor_res_dto extends musical_main_res_dto{
    actor_name: string;
}