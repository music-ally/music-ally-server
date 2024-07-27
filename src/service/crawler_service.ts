import * as playdb_crawler from "../crawler/playdb_crawler";
import mongoose from "mongoose";
import Musical from "../schema/musicals";
import {
  Musical_Res,
  Musical_Details,
  Casts,
} from "../dto/crawling/musical_crawling_res";
import Musicals from "../schema/musicals";
import Theaters from "../schema/theaters";
import { Theater_Res } from "../dto/crawling/theater_crawling_res";
import Areas from "../schema/areas";
import { Actor_Res } from "../dto/crawling/actor_crawling_res";
import Actors from "../schema/actors";
import Castings from "../schema/castings";

const get_musicals = async () => {
  try {
    const data = await playdb_crawler.fetch_all_musicals();

    return data;
  } catch (error) {
    console.error("Error in getMusicals service:", error);
    throw error;
  }
};

const get_actors = async () => {
  try {
    const data = await playdb_crawler.fetch_all_actors();
    return data;
  } catch (error) {
    console.error("Error in getArtists service:", error);
    throw error;
  }
};

const get_theaters = async () => {
  try {
    const data = await playdb_crawler.fetch_all_theaters();
    return data;
  } catch (error) {
    console.error("Error in getTheaters service:", error);
    throw error;
  }
};

const save_musicals = async (musicals: Musical_Res[], many_casts: Casts[]) => {
  try {
    for (const musical of musicals) {
      const crawler_theater = await Theaters.findOne({
        seats: musical.musical_details.place,
      });
      const start_date = musical.musical_details.date.split("~")[0];
      const end_date = musical.musical_details.date.split("~")[1];
      let insert_theater_id;

      if (!crawler_theater) {
        // 알수없음 극장
        insert_theater_id = new mongoose.Types.ObjectId(
          "66a3d8605077119748ebb6c4"
        );
      } else {
        insert_theater_id = crawler_theater._id;
      }

      const existing_musical = await Musicals.findOne({
        musical_playdb_id: musical.musical_ID,
      });

      if (!existing_musical) {
        // 뮤지컬 저장
        const musical_data = new Musicals({
          musical_playdb_id: musical.musical_ID,
          musical_name: musical.musical_details.title || "",
          musical_subname: musical.musical_details.sub_title || "",
          musical_genre: musical.musical_details.genre || "",
          start_at: start_date || "",
          end_at: end_date || "",
          theater_id: insert_theater_id,
          theater_name: musical.musical_details.place || "",
          age_limit: musical.musical_details.age_limit || "",
          runtime: musical.musical_details.runtime || "",
          website: musical.musical_details.website || "",
          poster_image: musical.musical_details.image_url || "",
        });

        await musical_data.save();

        // 출연진 저장
        for (const cast of many_casts) {
          const existing_actor = await Actors.findOne({"actor_name": cast.cast_names});
          let existing_actor_id;
          if (!existing_actor || !cast.cast_names) {
            existing_actor_id = new mongoose.Types.ObjectId("66a3df1c5077119748ebb6c5");
          } else {
            existing_actor_id = existing_actor?._id;
          }

          const existing_cast = await Castings.findOne({
            musical_id: musical.musical_ID,
            role: cast.role,
          });

          if (!existing_cast) {
            const cast_data = new Castings({
              musical_id: musical.musical_ID,
              role: cast.role,
              actor_id: existing_actor_id
            });

            await cast_data.save();

          } else {
            await existing_cast.updateOne({
              musical_id: musical.musical_ID,
              role: cast.role,
              actor_id: existing_actor_id
            });
          }
        }

      } else {
        await existing_musical.updateOne({
          musical_name: musical.musical_details.title,
          musical_subname: musical.musical_details.sub_title || "",
          musical_genre: musical.musical_details.genre || "",
          start_at: start_date || "",
          end_at: end_date || "",
          theater_id: insert_theater_id,
          theater_name: musical.musical_details.place || "",
          age_limit: musical.musical_details.age_limit || "",
          runtime: musical.musical_details.runtime || "",
          website: musical.musical_details.website || "",
          poster_image: musical.musical_details.image_url || "",
        });

        for (const cast of many_casts) {
          const existing_actor = await Actors.findOne({"actor_name": cast.cast_names});
          let existing_actor_id;
          if (!existing_actor || !cast.cast_names) {
            existing_actor_id = new mongoose.Types.ObjectId("66a3df1c5077119748ebb6c5");
          } else {
            existing_actor_id = existing_actor?._id;
          }

          const existing_cast = await Castings.findOne({
            musical_id: musical.musical_ID,
            role: cast.role,
          });

          if (!existing_cast) {
            const cast_data = new Castings({
              musical_id: musical.musical_ID,
              role: cast.role,
              actor_id: existing_actor_id
            });

            await cast_data.save();

          } else {
            await existing_cast.updateOne({
              musical_id: musical.musical_ID,
              role: cast.role,
              actor_id: existing_actor_id
            });
          }
        }
      }
      
    }
  } catch (error) {
    console.error("Error in save Musicals : service", error);
    throw error;
  }
};

const save_actors = async (actors: Actor_Res[]) => {
  try {
    for (const actor of actors) {
      const existing_actor = await Actors.findOne({
        actor_playdb_id: actor.actor_ID,
      });

      if (!existing_actor) {
        const data = new Actors({
          actor_playdb_id: actor.actor_ID,
          actor_name: actor.actor_details.name || "",
          profile_image: actor.actor_details.profile_image || "",
          birthday: actor.actor_details.birthday || "",
          agency: actor.actor_details.agency || "",
          physical: actor.actor_details.physical || "",
          debut: actor.actor_details.debut || "",
          job: actor.actor_details.job || "",
        });

        await data.save();
      } else {
        await existing_actor.updateOne({
          actor_playdb_id: actor.actor_ID,
          actor_name: actor.actor_details.name || "",
          profile_image: actor.actor_details.profile_image || "",
          birthday: actor.actor_details.birthday || "",
          agency: actor.actor_details.agency || "",
          physical: actor.actor_details.physical || "",
          debut: actor.actor_details.debut || "",
          job: actor.actor_details.job || "",
        });
      }
    }
  } catch (error) {
    console.error("Error in save Actors : service", error);
    throw error;
  }
};

const save_theaters = async (theaters: Theater_Res[]) => {
  try {
    for (const theater of theaters) {
      const location = await Areas.findOne({ area_name: theater.location });
      let location_id;
      if (!theater.location || !location) {
        location_id = new mongoose.Types.ObjectId("66a34d4b344abfd30961c724");
      } else {
        location_id = location?._id;
      }

      const existing_theater = await Theaters.findOne({
        theater_playdb_id: theater.theater_ID,
      });

      if (!existing_theater) {
        const data = new Theaters({
          theater_playdb_id: theater.theater_ID,
          theater_name: theater.name || "",
          area_id: location_id,
          theater_address: theater.theater_details.address || "",
          theater_road_address: theater.theater_details.road_address || "",
          seats: theater.theater_details.seats || "",
        });

        await data.save();
      } else {
        await existing_theater.updateOne({
          theater_playdb_id: theater.theater_ID,
          theater_name: theater.name || "",
          area_id: location_id,
          theater_address: theater.theater_details.address || "",
          theater_road_address: theater.theater_details.road_address || "",
          seats: theater.theater_details.seats || "",
        });
      }
    }
    console.log("Theaters saved successfully in service...🏤");
  } catch (error) {
    console.error("Error in save Theaters : service", error);
    throw error;
  }
};

export {
  get_musicals,
  get_actors,
  get_theaters,
  save_actors,
  save_musicals,
  save_theaters,
};
