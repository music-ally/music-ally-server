import mongoose from "mongoose";
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
import Actors from "../../schema/actors";
import Musicals from "../../schema/musicals";
import Castings from "../../schema/castings";
import { musical_info } from "../../dto/musical/musical_info";
import { actor_info } from "../../dto/actor/actor_info";
import Users from "../../schema/users";

/**
 * 뮤지컬의 playdb_id가
 * 유효한지 확인해주고
 * 스키마 반환
 */
const find_musical_by_playdb_id = async (musical_playdb_id: number) => {
  try {
    const musical = await Musicals.findOne({
      musical_playdb_id: musical_playdb_id,
    }).select("_id");

    if (!musical) {
      console.error("Error at service/actor/service_utils");
      throw new Error("musical not found");
    }

    return musical;
  } catch (error) {
    console.error("Error finding musical by playdb Id: ServiceUtils", error);
    throw error;
  }
};

/**
 * 배우의 playdb_id가
 * 유효한지 확인해주고
 * 스키마 반환
 */
const find_actor_by_playdb_id = async (actor_playdb_id: number) => {
  try {
    const actor = await Actors.findOne({
      actor_playdb_id: actor_playdb_id,
    }).select("_id");

    if (!actor) {
      console.error("Error at service/actor/service_utils");
      throw new Error("actor not found");
    }

    return actor;
  } catch (error) {
    console.error("Error finding actor by playdb Id: ServiceUtils", error);
    throw error;
  }
};

/**
 * 뮤지컬의 object_id가
 * 유효한지 확인해주고
 * 스키마 반환
 */
const find_musical_by_Id = async (musical_id: string) => {
  try {
    const musical = await Musicals.findById(musical_id);

    if (!musical) {
      console.error("Error at service/actor/service_utils");
      throw new Error("musical not found");
    }

    return musical;
  } catch (error) {
    console.error("Error finding musical by Id: ServiceUtils", error);
    throw error;
  }
};

/**
 * 배우의 object_id가
 * 유효한지 확인해주고
 * 스키마 반환
 */
const find_actor_by_id = async (actor_id: string) => {
  try {
    const actor = await Actors.findById(actor_id);

    if (!actor) {
      console.error("Error at service/actor/service_utils");
      throw new Error("actor not found");
    }

    return actor;
  } catch (error) {
    console.error("Error finding actor by Id: ServiceUtils", error);
    throw error;
  }
};

/**
 * 뮤지컬 object_id로
 * [뮤지컬 제목, 출연 배우들][]집합 반환
 */
const get_actors_in_musical = async (
  musical_id: string
): Promise<actor_main_musical_res_dto> => {
  try {
    const musical = await find_musical_by_Id(musical_id);
    const musical_actors = await get_actors_same_musical(musical_id);

    const data: actor_main_musical_res_dto = {
      musical_name: (await musical).musical_name,
      actors: musical_actors.actors,
    };

    return data;
  } catch (error) {
    console.error("Error fetching actors in musical: ServiceUtils", error);
    throw error;
  }
};

/**
 * 배우 object_id를 활용해
 * [배우 object_id, 프로필 이미지] 반환
 */
const get_actor_item_by_Id = async (
  actor_id: string
): Promise<actor_main_item_dto> => {
  try {
    const actor = await find_actor_by_id(actor_id);

    const data: actor_main_item_dto = {
      actor_id: actor.id,
      profile_image: actor.profile_image,
    };

    return data;
  } catch (error) {
    console.error("Error getting actor's item: ServiceUtils", error);
    throw error;
  }
};

/**
 * 동일한 뮤지컬 object_id를 가진
 * [배우 프로필] 집합[] 반환
 */
const get_actors_same_musical = async (
  musical_id: string
): Promise<actor_main_res_dto> => {
  try {
    const musical = await find_musical_by_Id(musical_id);

    // 특정 뮤지컬에 출연한 모든 배우의 캐스팅 정보를 가져옴
    const castings = await Castings.find({ musical_id: musical.id });
    const actors_same_musical: actor_main_item_dto[] = [];

    for (const casting of castings) {
      const actor = await find_actor_by_id(casting.actor_id.toString());
      if (actor) {
        const actor_item = await get_actor_item_by_Id(actor.id);
        actors_same_musical.push(actor_item);
      }
    }

    const data: actor_main_res_dto = {
      actors: actors_same_musical,
    };

    return data;
  } catch (error) {
    console.error(
      "Error finding actors with same musical: ServiceUtils",
      error
    );
    throw error;
  }
};

/**
 * 뮤지컬 랜덤 반환
 */
const get_random_musical = async () => {
  try {
    const random_musical = await Musicals.aggregate([{ $sample: { size: 1 } }]);

    if (random_musical.length === 0) {
      throw new Error("finding random musical fail");
    }

    return random_musical[0];
  } catch (error) {
    console.error("Error fetching random musical Id: ServiceUtils", error);
    throw error;
  }
};

/**
 * 가수 겸 뮤지컬 배우 랜덤 반환
 */
const get_random_singer = async () => {
  try {
    const random_singer = await Actors.aggregate([
      {
        $match: {
          $or: [{ job: "뮤지컬배우, 가수" }, { job: "가수, 뮤지컬배우" }],
        },
      },
      { $sample: { size: 1 } },
    ]);

    if (random_singer.length === 0) {
      throw new Error("finding random singer fail");
    }

    return random_singer[0];
  } catch (error) {
    console.error("Error fetching random singer Id: ServiceUtils", error);
    throw error;
  }
};

/**
 * 뮤지컬의 상세 정보 반환
 */
const get_musical_details = async (
  musical_id: string
): Promise<musical_info> => {
  try {
    const musical_details = await find_musical_by_Id(musical_id);

    if (!musical_details) {
      throw new Error("musical not found");
    }

    return musical_details;
  } catch (error) {
    console.error("Error fetching musical details: ServiceUtils", error);
    throw error;
  }
};

/**
 * 배우의 상세 정보 반환
 */
const get_actor_details = async (actor_id: string): Promise<actor_info> => {
  try {
    const actor_details = await find_actor_by_id(actor_id);

    if (!actor_details) {
      throw new Error("actor not found");
    }
    
    // 배우 조회할때마다 조회수 +1씩 증가
    actor_details.view++;
    await actor_details.save();

    return actor_details;
  } catch (error) {
    console.error("Error fetching musical details: ServiceUtils", error);
    throw error;
  }
};

/**
 * userId로 나이 찾아보기
 */
const find_age_by_userId = async (userId: string) => {
  try {
    const user = await Users.findById(userId);

    if(user?.birthday) {
      const today = new Date();
      const birthDate = new Date(user.birthday);
      let age = today.getFullYear() - birthDate.getFullYear();
      const month = today.getMonth() - birthDate.getMonth();
      if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
        age--;
      }
      return age/10;
    }
    else {
      return 0;
    }
  } catch (error) {
    console.error("Error finding person's age by userId: ServiceUtils", error);
    throw error;
  }
}

export {
  find_musical_by_playdb_id,
  find_actor_by_playdb_id,
  find_musical_by_Id,
  find_actor_by_id,
  get_actors_in_musical,
  get_actor_item_by_Id,
  get_actors_same_musical,
  get_random_musical,
  get_random_singer,
  get_musical_details,
  get_actor_details,
  find_age_by_userId
};
