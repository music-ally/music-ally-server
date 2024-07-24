import mongoose from "mongoose";
import { user_mypage_res_dto } from "../../dto/user/response/user_mypage_res";
import { user_profile_res_dto } from "../../dto/user/response/user_profile_res";
import { user_update_dto } from "../../dto/user/request/user_update";
import { user_update_res_dto } from "../../dto/user/response/user_update_res";
import {
  review_profile_res_dto,
  review_profile_item_dto,
} from "../../dto/review/response/review_profile_res";
import { review_mypage_detail_res_dto } from "../../dto/review/response/review_mypage_detail_res";
import {
  musical_profile_res_dto,
  musical_profile_item_dto,
} from "../../dto/musical/response/musical_profile_res";
import {
  follow_item_dto,
  follow_res_dto,
} from "../../dto/follow/response/follow_res";
import * as mypage_service_utils from "./mypage_service_utils";
import Users from "../../schema/users";
import Reviews from "../../schema/reviews";
import Review_likes from "../../schema/review_likes";
import Areas from "../../schema/areas";

/**
 * 내 프로필 반환
 */
const get_my_profile = async (
  user_id: string
): Promise<user_mypage_res_dto> => {
  try {
    const user = await mypage_service_utils.find_user_by_id(user_id);

    // 팔로잉수 반환값
    const following = await mypage_service_utils.get_following(user_id);
    const count_following = following.follow_list.length;
    // 팔로워수 반환값
    const follower = await mypage_service_utils.get_follower(user_id);
    const count_follower = follower.follow_list.length;
    // 리뷰 작성한 작품 반환
    const review_list = await mypage_service_utils.get_user_reviewed(user_id);
    const count_review = review_list.reviews.length;
    // 북마크한 작품 반환
    const bookmark_list = await mypage_service_utils.get_user_bookmarked(
      user_id
    );
    const count_bookmark = bookmark_list.musicals.length;

    const data: user_mypage_res_dto = {
      profile_image: user.profile_image,
      nickname: user.nickname,
      email: user.email,
      following_num: count_following,
      follower_num: count_follower,
      review_num: count_review,
      bookmark_num: count_bookmark,
      reviews: review_list,
      bookmarks: bookmark_list,
    };

    return data;
  } catch (error) {
    console.error("Error getting profile at mypage: Service", error);
    throw error;
  }
};

/**
 * 내가 작성한 리뷰 상세 모달 반환
 */
const mypage_review_detail = async (
  review_id: string
): Promise<review_mypage_detail_res_dto> => {
  try {
    const review = await mypage_service_utils.find_review_by_id(review_id);
    const review_musical = await mypage_service_utils.find_musical_by_id(
      review.musical_id.toString()
    );

    const data: review_mypage_detail_res_dto = {
      review_id: review._id,
      poster_image: review_musical.poster_image,
      musical_name: review_musical.musical_name,
      fear: review.fear,
      sensitivity: review.sensitivity,
      violence: review.violence,
      content: review.content,
    };

    return data;
  } catch (error) {
    console.error("Error getting detail review at mypage: Service", error);
    throw error;
  }
};

/**
 * 리뷰 삭제
 */
const delete_review = async (user_id: string, review_id: string) => {
  try {
    const user = await mypage_service_utils.find_user_by_id(user_id);
    const review_user = await Reviews.findOne({ user_id: user._id });
    if (review_user) {
      await Reviews.findByIdAndDelete({ _id: review_id });
      await Review_likes.deleteMany({ review_id: review_id });
    }
    else { 
      throw new Error("User does not match with this review");
    }
  } catch (error) {
    console.error("Error delete review at mypage: Service", error);
    throw error;
  }
};

/**
 * 개인정보 수정
 */
const update_profile = async (
  user_id: string,
  user_update_dto: user_update_dto
): Promise<user_update_res_dto> => {
  try {
    const user = await mypage_service_utils.find_user_by_id(user_id);

    const updated_user = await Users.findByIdAndUpdate(
      user._id,
      user_update_dto
    );

    const updated_homearea = await Areas.findById(updated_user?.homearea);

    const data: user_update_res_dto = {
      password: updated_user?.password,
      nickname: updated_user?.nickname,
      birthday: updated_user?.birthday,
      homearea_name: updated_homearea?.area_name,
      profile_image: updated_user?.profile_image,
    };

    return data;
  } catch (error) {
    console.error("Error updating profile at mypage: Service", error);
    throw error;
  }
};

export { get_my_profile, mypage_review_detail, delete_review, update_profile };
