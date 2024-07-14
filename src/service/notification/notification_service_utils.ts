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
import Follows from "../../schema/follows";

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
    console.error("Error getting user who liked my review: Service Utils", error);
    throw error;
  }
};

/**
 * 리뷰 좋아요 개수 세기
 */
const count_review_like = async (review_id: string) => {
  try {
    const review_likes = await Review_likes.find({ review_id: review_id });

    return review_likes.length;
  } catch (error) {
    console.error("Error counting review likes: Service Utils", error);
    throw error;
  }
}

/**
 * 내가 팔로우 하고 있는지 여부
 */
const check_is_followed = async (user_id: string, follower_id: string) => {
  try {
    const data = await Follows.findById({ from_user_id: user_id , to_user_id: follower_id });
    
    if(data) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error checking if I'm following: Service Utils", error);
    throw error;
  }
}

/**
 * 리뷰 좋아요 알림 가져오기
 */
const get_review_notifications = async (user_id: string, type: string) => {
  try {
    // user_id가 해당되는 알림들 모두 반환
    const notifications = await Notifications.find({
      user_id: user_id,
    }).sort({ create_at: -1 });

    // 사용자의 리뷰 알림 가져오기
    if (type === "리뷰") {
      const reviewLikeNotification: notification_item_dto[] = [];
      const reviewIds: string[] = [];

      for (const notification of notifications) {
        if (notification.type === "리뷰") {
          const review = await Reviews.findById(notification.review_id);
          const reviewMusical = await Musicals.findById(review?.musical_id);
          const reviewLikeUsers = await get_review_like_users(review?._id);
          const countReviewLike = await count_review_like(review?._id);
          
          reviewIds.push(review?._id);
          reviewLikeNotification.push({
            type: notification.type,
            create_at: notification.create_at,
            review_id: notification.review_id,
            poster_image: reviewMusical?.poster_image,
            review_like_nickname: reviewLikeUsers.recent_user?.nickname,
            review_like_image: reviewLikeUsers.users_with_profile_images?.map((user) => user.profile_image),
            review_like_num: countReviewLike,
          });
        }
      };

      return reviewLikeNotification;
    }
    
  } catch (error) {
    console.error("Error getting notifications by user id: Service", error);
    throw error;
  }
};

/**
 * 팔로우 알림 가져오기
 */
const get_follow_notifications = async (user_id: string, type: string) => {
  try {
    // user_id가 해당되는 알림들 모두 반환
    const notifications = await Notifications.find({
      user_id: user_id,
    }).sort({ create_at: -1 });

    // 사용자의 팔로워 알림 가져오기
    if (type === "팔로우") {
      const followNotification: notification_item_dto[] = [];

      for (const notification of notifications) {
        if (notification.type === "팔로우") {
          const follower = await Users.findById(notification.follower_id);
          const meFollow = await check_is_followed(user_id, follower?._id);

          followNotification.push({
            type: notification.type,
            create_at: notification.create_at,
            follower_id: notification.follower_id,
            follower_image: follower?.profile_image,
            follower_nickname: follower?.nickname,
            is_followed: meFollow,
          });
        }
      };

      return followNotification;
    }
  } catch (error) {
    console.error("Error getting notifications by user id: Service", error);
    throw error;
  }
};




export {
    get_review_like_users,
    count_review_like,
    check_is_followed,
    get_review_notifications,
    get_follow_notifications,
}
