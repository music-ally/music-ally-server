import mongoose from "mongoose";
import { user_mypage_res_dto } from "../../dto/user/response/user_mypage_res";
import { user_profile_res_dto } from "../../dto/user/response/user_profile_res";
import { user_update_dto } from "../../dto/user/request/user_update";
import { user_update_res_dto } from "../../dto/user/response/user_update_res";
import {
  review_profile_res_dto,
  review_profile_item_dto,
} from "../../dto/review/response/review_profile_res";
import {
  musical_profile_res_dto,
  musical_profile_item_dto,
} from "../../dto/musical/response/musical_profile_res";
import {
  follow_item_dto,
  follow_res_dto,
} from "../../dto/follow/response/follow_res";
import Users from "../../schema/users";
import Follows from "../../schema/follows";
import Reviews from "../../schema/reviews";
import Musicals from "../../schema/musicals";
import Bookmarks from "../../schema/bookmarks";

/**
 * 사용자의 object_id로
 * 스키마 반환
 */
const find_user_by_id = async (user_id: string) => {
  try {
    const user = await Users.findById(user_id);

    if (!user) {
      console.error("Error at service/mypage/service_utils");
      throw new Error("user not found");
    }

    return user;
  } catch (error) {
    console.error("Error finding user by Id: ServiceUtils", error);
    throw error;
  }
};

/**
 * 리뷰 object_id로
 * 스키마 반환
 */
const find_review_by_id = async (review_id: string) => {
  try {
    const review = await Reviews.findById(review_id);

    if (!review) {
      console.error("Error at service/mypage/service_utils");
      throw new Error("review not found");
    }

    return review;
  } catch (error) {
    console.error("Error finding review by Id: ServiceUtils", error);
    throw error;
  }
};

/**
 * 뮤지컬 object_id로
 * 스키마 반환
 */
const find_musical_by_id = async (musical_id: string) => {
  try {
    const musical = await Musicals.findById(musical_id);

    if (!musical) {
      console.error("Error at service/mypage/service_utils");
      throw new Error("musical not found");
    }

    return musical;
  } catch (error) {
    console.error("Error finding musical by Id: ServiceUtils", error);
    throw error;
  }
};

/**
 * 내가 상대를 팔로우하고 있는지 확인
 */
const is_follow = async (user_id: string, opponent_id: string) => {
  try {
    const data = await Follows.exists({
      from_user_id: user_id,
      to_user_id: opponent_id,
    });
    if(data){
      return true;
    }
    else {
      return false;
    }
  } catch (error) {
    console.error("Error finding do I follow someone: ServiceUtils", error);
    throw error;
  }
}


/**
 * 사용자의 object_id로
 * 내가 팔로우 하는 사람들(=팔로잉) 목록 반환
 */
const get_following = async (user_id: string): Promise<follow_res_dto> => {
  try {
    const following_list: follow_item_dto[] = [];

    // 사용자가 팔로우하는 사람들의 리스트를 가져옴
    const follows = await Follows.find({ from_user_id: user_id });

    for (const follow of follows) {
      const followed_user = await find_user_by_id(follow.to_user_id.toString());

      following_list.push({
        user_id: follow.to_user_id,
        nickname: followed_user.nickname,
        email: followed_user.email,
        is_following: true,
      });
    }

    const data: follow_res_dto = {
      follow_list: following_list,
    };

    return data;
  } catch (error) {
    console.error("Error getting following: ServiceUtils", error);
    throw error;
  }
};

/**
 * 사용자의 object_id로
 * 나를 팔로우 하는 사람들(=팔로워) 반환
 */
const get_follower = async (user_id: string): Promise<follow_res_dto> => {
  try {
    const follower_list: follow_item_dto[] = [];

    // 사용자를 팔로우하는 사람들의 리스트를 가져옴
    const follows = await Follows.find({ to_user_id: user_id });

    for (const follow of follows) {
      const follows_user = await find_user_by_id(
        follow.from_user_id.toString()
      );

      // 내가 상대를 팔로우하고있는지 확인하는 작업
      const find_is_follow = await is_follow(user_id, follow.from_user_id.toString());

      follower_list.push({
        user_id: follow.from_user_id,
        nickname: follows_user.nickname,
        email: follows_user.email,
        is_following: find_is_follow,
      });
    }

    const data: follow_res_dto = {
      follow_list: follower_list,
    };

    return data;
  } catch (error) {
    console.error("Error getting follower: ServiceUtils", error);
    throw error;
  }
};

/**
 * 사용자가 리뷰 작성한 작품 반환
 */
const get_user_reviewed = async (
  user_id: string
): Promise<review_profile_res_dto> => {
  try {
    const reviewed_list: review_profile_item_dto[] = [];

    const reviews = await Reviews.find({ user_id: user_id });

    for (const review of reviews) {
      const review_musical = await Musicals.findById(review.musical_id);

      reviewed_list.push({
        review_id: review._id,
        poster_image: review_musical?.poster_image || "",
      });
    }

    const data: review_profile_res_dto = {
      reviews: reviewed_list,
    };

    return data;
  } catch (error) {
    console.error("Error getting user reviewd musicals: ServiceUtils", error);
    throw error;
  }
};

/**
 * 사용자가 찜한 작품 반환
 */
const get_user_bookmarked = async (
  user_id: string
): Promise<musical_profile_res_dto> => {
  try {
    const bookmarked_list: musical_profile_item_dto[] = [];

    const bookmarks = await Bookmarks.find({ user_id: user_id });

    for (const bookmark of bookmarks) {
      const bookmark_musical = await Musicals.findById(bookmark.musical_id);

      if (bookmark_musical) {
        bookmarked_list.push({
          musical_id: bookmark_musical._id,
          poster_image: bookmark_musical.poster_image || "",
        });
      }
    }

    const data: musical_profile_res_dto = {
      musicals: bookmarked_list,
    };

    return data;
  } catch (error) {
    console.error(
      "Error getting user bookmarked musicals: ServiceUtils",
      error
    );
    throw error;
  }
};

export {
  find_user_by_id,
  find_review_by_id,
  find_musical_by_id,
  is_follow,
  get_following,
  get_follower,
  get_user_reviewed,
  get_user_bookmarked,
};
