import mongoose from "mongoose";
import Musicals from "../../schema/musicals";
import Actors from "../../schema/actors";
import Reviews from "../../schema/reviews";
import { review_write_dto } from "../../dto/review/request/review_write";
import { review_update_dto } from "../../dto/review/request/review_update";
import { review_detail_res_dto } from "../../dto/review/response/review_detail_res";
import { review_main_res_dto } from "../../dto/review/response/review_main_res";
import Review_likes from "../../schema/review_likes";
import Users from "../../schema/users";
import Theaters from "../../schema/theaters";


const all_review = async () => {

  try {
    const data = {

    }




    return data;

  } catch (error) {
    console.error("Error at get all_review: Service", error);
    throw error;
  }
};


const best_review = async () => {

  try {
    const data = {

    }




    return data;

  } catch (error) {
    console.error("Error at get best_review: Service", error);
    throw error;
  }
};

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

const review_detail = async (review_id: string, user_id: string) => {

  try {
    const review = await Reviews.findById(review_id)
      .populate({
        path: 'user_id',
        model: Users,
        select: 'profile_image nickname email'
      })
      .populate({
        path: 'musical_id',
        model: Musicals,
        populate: {
          path: 'theater_id',
          model: Theaters,
          select: 'theater_name'
        },
        select: 'poster_uri musical_name'
      })
      .populate({
        path: 'actor_ids',
        model: Actors,
        select: 'profile_image actor_name'
      })
      .exec() as any; // 이렇게 any로 캐스팅해줘야 오류가 안 나는데 왜 필요한지 모르겠음...

    if (!review) {
      throw new Error('Review not found');
    }

    console.log(review);

    const isLike = await Review_likes.exists({ user_id, review_id });

    const maskedEmail = `${review.user_id.email.slice(0, 2)}****`;
    
    const like_num = await Review_likes.countDocuments({ review_id: review_id });

    const data: review_detail_res_dto = {
      review_id: review._id,
      musical: {
        musical_id: review.musical_id._id,
        poster_uri: review.musical_id.poster_uri,
        musical_name: review.musical_id.musical_name,
        theater_name: review.musical_id.theater_id.theater_name,
        watch_at: review.watch_at,
      },
      actors: review.actor_ids.map((actor: any) => ({
        actor_id: actor._id,
        profile_image: actor.profile_image,
        actor_name: actor.actor_name,
      })),
      poster_uri: review.musical_id.poster_uri,
      reviewer_profile_image: review.user_id.profile_image || null,
      reviewer_nickname: review.user_id.nickname,
      reviewer_email: maskedEmail,
      like_num: like_num,
      is_like: Boolean(isLike),
      violence: review.violence,
      fear: review.fear,
      sensitivity: review.sensitivity,
      content: review.content,
      create_at: review.create_at
    };  


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

    return

  } catch (error) {
    console.error("Error at review_like: Service", error);
    throw error;
  }
};

const cancel_review_like = async (user_id: string, review_id: string) => {
  try {
    const review_like = await Review_likes.findOneAndDelete({
      user_id: user_id,
      review_id: review_id
    });

    return

  } catch (error) {
    console.error("Error at cancel_review_like: Service", error);
    throw error;
  }
};


export { all_review, best_review, write_review, update_review, review_detail, review_like, cancel_review_like };
