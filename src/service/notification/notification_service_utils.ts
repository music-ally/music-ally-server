import mongoose from "mongoose";
import {
  notification_res_dto,
  notification_item_dto,
} from "../../dto/notification/response/notification_res";
import Users from "../../schema/users";
import Reviews from "../../schema/reviews";
import Notifications from "../../schema/notifications";
import Musicals from "../../schema/musicals";
import Review_likes from "../../schema/review_likes";

/**
 * 리뷰 좋아요 누른 유저 반환
 */
const get_review_like_users = async (review_id: string) => {
  try {
    const recent_likes = await Review_likes.findById({
      review_id: review_id,
    })
      .sort({ created_at: -1 })
      .limit(2);

    if (!Array.isArray(recent_likes) || recent_likes?.length == 0) {
      return { message: "No likes found for this review." };
    }

    const user_ids = recent_likes.map((like) => like.user_id);
    const users_with_profile_images = await Users.find(
      { _id: { $in: user_ids } },
      { profile_image: 1 }
    );

    const most_recent_like = recent_likes[0];
    const recent_user = await Users.findById(most_recent_like.user_id, {
      nick_name: 1
    });

    return {
      users_with_profile_images,
      recent_user,
    };
  } catch (error) {
    console.error("Error getting user who liked my review: Service", error);
    throw error;
  }
};

export {
    get_review_like_users
}
No newline at end of file
