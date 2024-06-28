import mongoose from "mongoose";
import { actor_detail_res_dto } from "../../dto/actor/response/actor_detail_res";
import { actor_main_musical_res_dto } from "../../dto/actor/response/actor_main_musical_res";
import { actor_main_res_dto } from "../../dto/actor/response/actor_main_res";
import { actor_search_res_dto, actor_search_item_dto } from "../../dto/actor/response/actor_search_res";
import Actors from "../../schema/actors";

/**
 * 특정 뮤지컬id값으로
 * 뮤지컬 제목 반환
 */
const get_musical_name_by_Id = async(musicalId : number)