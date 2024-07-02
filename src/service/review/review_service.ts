import mongoose from "mongoose";
import Musicals from "../../schema/musicals";
import Actors from "../../schema/actors";
import Reviews from "../../schema/reviews";
import { review_write_dto } from "../../dto/review/request/review_write";
import { watch } from "fs";

const write_review = async (user_id : string, review_write_dto : review_write_dto) => {  

  try {
    const review = new Reviews({
      user_id: user_id,
      musical_id: review_write_dto.musical_id,
      actor_ids: review_write_dto.actor_ids,
      content: review_write_dto.content,
      watch_at: new Date(review_write_dto.watch_at),
      create_at: new Date(),
      fear: review_write_dto.fear,
      sensitivity: review_write_dto.sensitivity,
      violence: review_write_dto.violence,
    });

    await review.save();

    const data = {
      _id: review._id,
    };
    
    return data;

  } catch (error) {
    console.error("Error at write_review: Service", error);
    throw error;
  }
};

export { write_review };
