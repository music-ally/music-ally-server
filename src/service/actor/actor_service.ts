import mongoose from "mongoose";
import { create_actor_dto } from "../../dto/actor/response/create_actor";
import { actor_detail_res_dto } from "../../dto/actor/response/actor_detail_res";
import { actor_main_musical_res_dto } from "../../dto/actor/response/actor_main_musical_res";
import {
  actor_main_res_dto,
  actor_main_item_dto,
} from "../../dto/actor/response/actor_main_res";
import {
  actor_search_res_dto,
  actor_search_item_dto,
} from "../../dto/actor/response/actor_search_res";
import * as actor_service_util from "./actor_service_util";
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
    const musical_actors = await actor_service_util.get_actors_same_musical(
      musical_id
    );

    const data: actor_main_musical_res_dto = {
      musical_name: (await musical).musical_name,
      actors: musical_actors.actors,
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
const get_actors_in_random_musical =
  async (): Promise<actor_main_musical_res_dto> => {
    try {
      const random_musical = await actor_service_util.get_random_musical();
      const musical_actors = await actor_service_util.get_actors_same_musical(
        random_musical.id
      );

      const data: actor_main_musical_res_dto = {
        musical_name: random_musical.musical_name,
        actors: musical_actors.actors,
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
const get_many_actors_in_random_musical =
  async (): Promise<actor_main_musical_res_dto> => {
    try {
      let musical_actors: actor_main_res_dto;
      let random_musical;

      // 출연 배우가 5명 이상인 뮤지컬을 찾을 때까지 반복
      while (true) {
        random_musical = await actor_service_util.get_random_musical();
        musical_actors = await actor_service_util.get_actors_same_musical(
          random_musical.id
        );

        if (musical_actors.actors.length >= 5) {
          break;
        }
      }

      const data: actor_main_musical_res_dto = {
        musical_name: random_musical.musical_name,
        actors: musical_actors.actors,
      };

      return data;
    } catch (error) {
      console.error(
        "Error fetching more than five actors in random musical: Service",
        error
      );
      throw error;
    }
  };

/**
 * 특정 직업(=가수)의 뮤지컬 배우들
 * 10명 랜덤 반환
 */
const get_singers = async (): Promise<actor_main_res_dto> => {
  try {
    const unique_singer = new Set<string>();
    const singer_list: actor_main_item_dto[] = [];

    let attempts = 0;

    while (unique_singer.size < 10 && attempts < 50) { // 최대 50번 시도
      const singer = await actor_service_util.get_random_singer(); // actor_service_util.get_random_singer() 호출 수정

      if (!unique_singer.has(singer._id.toString())) {
        unique_singer.add(singer._id.toString());
        singer_list.push({
          actor_id: singer._id.toString(),
          profile_image: singer.profile_image,
        });
      }

      attempts++;
    }

    if (unique_singer.size < 10) {
      throw new Error("Not enough unique singers found");
    }

    const data: actor_main_res_dto = {
      actors: singer_list,
    };

    return data;
  } catch (error) {
    console.error("Error fetching singers: Service", error);
    throw error;
  }
};

/**
 * 조회수가 가장 높은 배우 반환
 */

/**
 * 더미 데이터 넣기용
 */
const create_actor = async (
  create_actor_dto:create_actor_dto
) => {
  try {
    const birthday = new Date(create_actor_dto.birthday);

    const actor = new Actors({
      actor_playdb_id: create_actor_dto.actor_playdb_id,
      actor_name: create_actor_dto.actor_name,
      profile_image: create_actor_dto.profile_image,
      birthday: birthday,
      agency: create_actor_dto.agency,
      physical: create_actor_dto.physical,
      job: create_actor_dto.job,
    });

    await actor.save();

    const data = {
      _id: actor._id,
    };

    return data;
  } catch (error) {
    console.error("Error creating actors: Service", error);
    throw error;
  }
};

export {
  get_actors_in_musical,
  get_actors_in_random_musical,
  get_many_actors_in_random_musical,
  get_singers,
  create_actor
};
