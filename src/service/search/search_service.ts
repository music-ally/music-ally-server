import mongoose from "mongoose";
import { actor_info } from "../../dto/actor/actor_info";
import {
  actor_search_res_dto,
  actor_search_item_dto,
} from "../../dto/actor/response/actor_search_res";
import {
  musical_search_res_dto,
  musical_search_item_dto,
} from "../../dto/musical/response/musical_search_res";
import Actors from "../../schema/actors";
import Musicals from "../../schema/musicals";

const search_musical = async (
  keyword: string
): Promise<musical_search_res_dto> => {
  try {

  } catch (error) {
    console.error("Error fetching actors in random musical: Service", error);
    throw error;
  }
};

export {
    search_musical,
}
