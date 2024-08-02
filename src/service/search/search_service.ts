import Musicals from "../../schema/musicals";
import Theaters from "../../schema/theaters";
import Actors from "../../schema/actors";
import { musical_search_item_dto, musical_search_res_dto } from "../../dto/musical/response/musical_search_res";
import { actor_search_res_dto, actor_search_item_dto } from "../../dto/actor/response/actor_search_res";


const search_musical = async (keyword: string) => {
  try {

    const musicals = await Musicals.find({
      musical_name: { $regex: keyword, $options: 'i' }
    })
      .populate({
        path: 'theater_id',
        model: Theaters,
        select: 'theater_name'
      }).exec() as any[]; //exec()의 필요성,, promise 반환? 인데 잘 모르겠음

    const musical_dto : musical_search_item_dto[] = musicals.map(musical => ({
      musical_id: musical._id,
      poster_image: musical.poster_image,
      musical_name: musical.musical_name,
      start_at: musical.start_at,
      end_at: musical.end_at,
      theater_name: musical.theater_id.theater_name
    }))

    const data: musical_search_res_dto = {
      musicals: musical_dto
    }

    return data

  } catch (error) {
    console.error("Error at searching musical: Service", error);
    throw error;
  }
}

const search_actor = async (keyword: string): Promise<actor_search_res_dto> => {
  try {
    const actor_list: actor_search_item_dto[] = [];

    const all_actors = await Actors.find({
      actor_name: { $regex: keyword, $options: 'i' }
    });

    all_actors.forEach((actor) => {
      actor_list.push({
        actor_id: actor._id,
        profile_image: actor.profile_image,
        actor_name: actor.actor_name,
        agency: actor.agency,
        birthday: actor.birthday,
      });
    });

    const data: actor_search_res_dto = {
      actors: actor_list,
    };

    return data;
  } catch (error) {
    console.error("Error searching actors: Service", error);
    throw error;
  }
};

export {
  search_musical,
  search_actor
};
