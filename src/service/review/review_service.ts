import mongoose from "mongoose";
import Musicals from "../../schema/musicals";
import Actors from "../../schema/actors";
import Reviews from "../../schema/reviews";
import { review_write_dto } from "../../dto/review/request/review_write";
import { review_update_dto } from "../../dto/review/request/review_update";
import { review_detail_res_dto } from "../../dto/review/response/review_detail_res";
import Review_likes from "../../schema/review_likes";

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

const update_review = async (review_id: string, review_update_dto: review_update_dto) => {

  try {
    const data = await Reviews.findByIdAndUpdate(
      review_id,
      review_update_dto,
      { new: true }
    );

    return data;

  } catch (error) {
    console.error("Error at update_review: Service", error);
    throw error;
  }
};

const review_detail = async (review_id: string) => {

  try {
    const data = {

    }




    return data;

  } catch (error) {
    console.error("Error at update_review: Service", error);
    throw error;
  }
};

const review_like = async (user_id: string, review_id: string) => {

  try {
    const review_like = new Review_likes({
      user_id: user_id,
      review_id: review_id
    });

    await review_like.save();

    const data = {
      _id: review_like._id,
    };

    return data;

  } catch (error) {
    console.error("Error at review_like: Service", error);
    throw error;
  }
};

export { write_review, update_review, review_detail, review_like };