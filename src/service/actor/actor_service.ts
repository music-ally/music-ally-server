import mongoose from "mongoose";
import { actor_detail_res_dto } from "../../dto/actor/response/actor_detail_res";
import { actor_main_musical_res_dto } from "../../dto/actor/response/actor_main_musical_res";
import { actor_main_res_dto, actor_main_item_dto } from "../../dto/actor/response/actor_main_res";
import { actor_search_res_dto, actor_search_item_dto } from "../../dto/actor/response/actor_search_res";
import * as actor_service_util from './actor_service_util'
import Actors from "../../schema/actors";
import { actor_info } from "../../dto/actor/actor_info";
import Musicals from "../../schema/musicals";

/**
 * 뮤지컬 object_id로
 * [뮤지컬 제목, 출연 배우들][]집합 반환
 */
const get_actors_in_musical = async (
  musical_id: string
): Promise<actor_main_musical_res_dto> => {
  try {
    const musical = actor_service_util.find_musical_by_Id(musical_id);
    const musical_actors = await actor_service_util.get_actors_same_musical(musical_id)

    const data: actor_main_musical_res_dto = {
      musical_name: (await musical).musical_name,
      actors: musical_actors.actors
    };

    return data;
  } catch (error) {
    console.error("Error fetching actors in musical: Service", error);
    throw error;
  }
};

/**
 * 랜덤한 뮤지컬 1개의
 * [뮤지컬 제목, 출연 배우들][]집합 반환
 */
const get_actors_in_random_musical = async (): Promise<actor_main_musical_res_dto> => {
  try {

    const random_musical = await actor_service_util.get_random_musical();
    const musical_actors = await actor_service_util.get_actors_same_musical(random_musical.id)
    
    const data: actor_main_musical_res_dto = {
      musical_name: random_musical.musical_name,
      actors: musical_actors.actors
    };

    return data;
  } catch (error) {
    console.error("Error fetching actors in random musical: Service", error);
    throw error;
  }
};

/**
 * 랜덤한 뮤지컬 1개의
 * 출연배우가 5명 이상일 경우에만
 * [뮤지컬 제목, 출연 배우들][]집합 반환
 */
const get_many_actors_in_random_musical = async (): Promise<actor_main_musical_res_dto> => {
  try {

    let musical_actors: actor_main_res_dto;
    let random_musical;

    // 출연 배우가 5명 이상인 뮤지컬을 찾을 때까지 반복
    while (true) {
      random_musical = await actor_service_util.get_random_musical();
      musical_actors = await actor_service_util.get_actors_same_musical(random_musical.id);

      if (musical_actors.actors.length >= 5) {
        break;
      }
    }

    const data: actor_main_musical_res_dto = {
      musical_name: random_musical.musical_name,
      actors: musical_actors.actors
    };

    return data;
  } catch (error) {
    console.error("Error fetching more than five actors in random musical: Service", error);
    throw error;
  }
};

/**
 * 특정 직업(=가수)의 뮤지컬 배우들 
 * 10명 랜덤 반환
 */
const get_singers = async() : Promise<actor_main_res_dto>=> {
  try{
    const unique_singer = new Set<string>();
    const singer_list: actor_main_item_dto[] = [];

    while (unique_singer.size < 10) {
      const singer = await actor_service_util.get_random_singer();
      
      if (!unique_singer.has(singer.id)) {
        unique_singer.add(singer.id);

        singer_list.push({
          actor_id: singer.id,
          profile_image: singer.profile_image,
        });
      }
    }

    const data: actor_main_res_dto = {
      actors: singer_list,
    };

    return data
  } catch (error) {
    console.error("Error fetching singers: Service", error);
    throw error;
  }
}

/**
 * 조회수가 가장 높은 배우 반환
 */


export {
  get_actors_in_musical,
  get_actors_in_random_musical,
  get_many_actors_in_random_musical,
  get_singers,

}