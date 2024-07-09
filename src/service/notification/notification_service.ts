import mongoose from "mongoose";
import {
  notification_res_dto,
  notification_item_dto,
} from "../../dto/notification/response/notification_res";
import Users from "../../schema/users";
import Reviews from "../../schema/reviews";
import Review_likes from "../../schema/review_likes";
import Areas from "../../schema/areas";
import Notifications from "../../schema/notifications";

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
    const notifications = await Notifications.find({
      user_id: user_id,
    }).sort({ create_at: -1 });

    if (type === "리뷰") {
      const reviewLikeNotifications: notification_item_dto[] = [];
      const reviewIds: string[] = [];

      notifications.forEach((notification) => {
        if (notification.type === "리뷰") {
          if (!reviewIds.includes(notification.review_id.toString())) {
            reviewIds.push(notification.review_id.toString());
            reviewLikeNotifications.push({
              type: notification.type,
              create_at: notification.create_at,
              review_id: notification.review_id,
            });
          }
        }
      });

      return reviewLikeNotifications;
    }
    else if (type === "팔로우") {
      const followNotifications: notification_item_dto[] = [];

      notifications.forEach((notification) => {
        if (notification.type === "팔로우") {
          followNotifications.push({
            type: notification.type,
            create_at: notification.create_at,
            follower_id: notification.follower_id,
          });
        }
      });

      return followNotifications;
    }
  } catch (error) {
    console.error("Error getting notifications by user id: Service", error);
    throw error;
  }
};
