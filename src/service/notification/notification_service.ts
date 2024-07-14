import mongoose from "mongoose";
import {
  notification_res_dto,
  notification_item_dto,
} from "../../dto/notification/response/notification_res";
import Notifications from "../../schema/notifications";
import * as notification_service_utils from "./notification_service_utils";

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
    const reviewLikeNotifications = await notification_service_utils.get_review_notifications(user_id, "리뷰") || [];;
    const followNotifications = await notification_service_utils.get_follow_notifications(user_id, "팔로우") || [];;

    const notifications: notification_item_dto[] = reviewLikeNotifications.concat(followNotifications);

    return { notifications };

  } catch (error) {
    console.error("Error getting notifications: Service", error);
    throw error;
  }
};

export {
  make_notification,
  get_notification,
}

