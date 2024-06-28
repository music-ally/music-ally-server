import mongoose from "mongoose";
import { actor_detail_res_dto } from "../../dto/actor/response/actor_detail_res";
import { actor_main_musical_res_dto } from "../../dto/actor/response/actor_main_musical_res";
import { actor_main_res_dto } from "../../dto/actor/response/actor_main_res";
import { actor_search_res_dto, actor_search_item_dto } from "../../dto/actor/response/actor_search_res";
import Actors from "../../schema/actors";

/**
 * 특정 뮤지컬 출연 배우들 반환
 */
const get_actor_in_musical = async (
  musicalId: string
): Promise<actor_main_musical_res_dto> => {
  try {
  } catch (error) {
    console.error("Error fetching actors in musical:", error);
    throw error;
  }
};
/**
 * 특정 직업(=가수) 배우들 반환
 */

/**
 * 조회수가 가장 높은 배우 반환
 */

/**
 * 특정 배우 정보 반환
 */
