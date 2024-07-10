import mongoose from "mongoose";
import {
  notification_res_dto,
  notification_item_dto,
} from "../../dto/notification/response/notification_res";
import Notifications from "../../schema/notifications";
import Musicals from "../../schema/musicals";
import * as notification_service_utils from "./notification_service_utils";
import Reviews from "../../schema/reviews";

/**
 * 알림 생성
 * : 리뷰 좋아요 받았을때, 팔로우 받았을때
 */
const make_notification = async (
  to_user_id: string,
  from_user_id: string,
  review_id?: string
) => {
  try {
    // 리뷰 알림 생성
    if (review_id) {
      const reviewNotification = new Notifications({
        user_id: to_user_id,
        type: "리뷰",
        create_at: new Date(),
        review_id: review_id,
      });
      await reviewNotification.save();
      console.log(`${from_user_id}가 ${to_user_id}리뷰에 좋아요를 눌렀음`)
    }
    // 팔로우 알림 생성
    else {
      const followNotification = new Notifications({
        user_id: to_user_id,
        type: "팔로우",
        create_at: new Date(),
        follower_id: from_user_id,
      });
      await followNotification.save();
      console.log(`${from_user_id}가 ${to_user_id}를 팔로우함`)
    }
  } catch (error) {
    console.error("Error making notifications: Service", error);
    throw error;
  }
};

/**
 * 알림 전체 반환
 * : 동일한 리뷰 id를 가진 좋아요 알림은 하나로 통합
 * : 팔로우 알림은 하나씩 반환
 */
const get_notification = async (
  user_id: string
): Promise<notification_res_dto> => {
  try {
    const reviewLikeNotifications;
    const followNotifications;
  } catch (error) {
    console.error("Error getting notifications: Service", error);
    throw error;
  }
};

/**
 * 알림 가져오기
 */
const get_notifications_by_user_id = async (user_id: string, type: string) => {
  try {
    // user_id가 해당되는 알림들 모두 반환
    const notifications = await Notifications.find({
      user_id: user_id,
    }).sort({ create_at: -1 });

    if (type === "리뷰") {
      const reviewLikeNotification: notification_item_dto[] = [];
      const reviewIds: string[] = [];

      notifications.forEach((notification) => {
        if (notification.type === "리뷰") {
          const review = await Reviews.findById(notification.review_id);
          const reviewMusical = await Musicals.findById(review?.musical_id);
          const reviewLikeUsers = await notification_service_utils.get_review_like_users(notification.review_id);

          reviewIds.push(notification.review_id?);
          reviewLikeNotification.push({
            type: notification.type,
            create_at: notification.create_at,
            review_id: notification.review_id,
            poster_image: reviewMusical?.poster_image,
            review_like_nickname: reviewLikeUsers.recent_user?.nickname,
            review_like_image: reviewLikeUsers.users_with_profile_images?.map((user) => user.profile_image),
            review_like_num: number;
          });
        }
      });

      // return reviewLikeNotification;
    }
    // 사용자의 팔로워 알림 가져오기
    else if (type === "팔로우") {
      const followNotification: notification_item_dto[] = [];

      notifications.forEach((notification) => {
        if (notification.type === "팔로우") {
          const follower = await Users.findById(notification.follower_id);
          const meFollow = 
          followNotification.push({
            type: notification.type,
            create_at: notification.create_at,
            follower_id: notification.follower_id,
            follower_image: follower?.profile_image,
            follower_nickname: follower?.nickname,
            // is_followed:
          });
        }
      });

      return followNotification;
    }
  } catch (error) {
    console.error("Error getting notifications by user id: Service", error);
    throw error;
  }
};
