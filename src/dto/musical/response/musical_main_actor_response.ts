import mongoose from "mongoose";
import { musical_main_response_dto } from "../response/musical_main_response";

//특정 배우의 뮤지컬 DTO
export interface musical_main_actor_response_dto extends musical_main_response_dto{
    actor_name: string;
}