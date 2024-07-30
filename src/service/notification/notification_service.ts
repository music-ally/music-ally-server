import mongoose from "mongoose";
import {
  notification_res_dto,
  notification_item_dto,
} from "../../dto/notification/response/notification_res";
import Notifications from "../../schema/notifications";
import * as notification_service_utils from "./notification_service_utils";
import Reviews from "../../schema/reviews";
import Follows from "../../schema/follows";
import Users from "../../schema/users";

/**
 * 알림 생성
 * : 리뷰 좋아요 받았을때
 */
const make_review_notification = async (
  type: string,
  review_id: string,
  from_user_id: string // 리뷰 좋아요 누른 사람
) => {
  try {
    // 중복 알림 존재하는지 확인
    const exist = await Notifications.find({
      review_like_user_id: from_user_id,
      review_id: review_id,
    });

    console.log(exist);
    

    // 리뷰 알림 생성
    if (type === "리뷰" && exist.length === 0) {
      const to_user_id = await Reviews.findById(review_id).select("user_id");
      const reviewNotification = new Notifications({
        user_id: to_user_id?.user_id,
        type: "리뷰",
        create_at: new Date(),
        review_id: review_id,
        review_like_user_id: from_user_id
      });
      await reviewNotification.save();
    }
    else {
      console.log("이미 알림이 존재합니다.");
    }
  } catch (error) {
    console.error("Error making notifications: Service", error);
    throw error;
  }
};

/**
 * 알림 생성
 * : 팔로우 받았을때
 */
const make_follow_notification = async (
  type: string,
  to_user_id: string, // 팔로우 받은 사람
  from_user_id: string // 팔로우 누른 사람
) => {
  try {
    // 중복 알림 존재하는지 확인
    const exist = await Notifications.find({
      user_id: to_user_id,
      follower_id: from_user_id,
    });

    // 팔로우 알림 생성
    if (type === "팔로우" && !exist) {
      const followNotification = new Notifications({
        user_id: to_user_id,
        type: "팔로우",
        create_at: new Date(),
        follower_id: from_user_id,
      });
      await followNotification.save();
      console.log(`${from_user_id}가 ${to_user_id}를 팔로우함`);
    }
    else {
      console.log("이미 알림이 존재합니다.");
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
    const reviewLikeNotifications =
      (await notification_service_utils.get_review_notifications(
        user_id,
        "리뷰"
      )) || [];
    const followNotifications =
      (await notification_service_utils.get_follow_notifications(
        user_id,
        "팔로우"
      )) || [];

    const notifications: notification_item_dto[] = [
      ...reviewLikeNotifications,
      ...followNotifications,
    ];

    return { notifications };
  } catch (error) {
    console.error("Error getting notifications: Service", error);
    throw error;
  }
};

/**
 * 알림 껐다 키기
 */
const on_off_notification = async (user_id: string) => {
  try {
    const user = await Users.findById(user_id);

    if (user) {
      user.noti_allow = !user.noti_allow;
      await user.save();
    }
  } catch (error) {
    console.error("Error turn on/off notifications: Service", error);
    throw error;
  }
};

export {
  make_review_notification,
  make_follow_notification,
  get_notification,
  on_off_notification,
};
