import mongoose from "mongoose";
import Users from "../../schema/users";
import Follows from "../../schema/follows";
import * as notification_service from "../notification/notification_service";
import * as mypage_service_utils from "../mypage/mypage_service_utils";
import * as profile_service_utils from "./profile_service_utils";
import { user_profile_res_dto } from "../../dto/user/response/user_profile_res";
import { user_mypage_res_dto } from "../../dto/user/response/user_mypage_res";
import {
  follow_item_dto,
  follow_res_dto,
} from "../../dto/follow/response/follow_res";

/**
 * 특정 유저 프로필 반환
 */
const get_user_profile = async (
  user_id: string,
  to_user_id: string
): Promise<user_profile_res_dto> => {
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
    // 팔로우 여부 확인
    const is_following = await profile_service_utils.check_follow(
      user_id,
      to_user_id
    );

    const data: user_profile_res_dto = {
      profile_image: user.profile_image,
      nickname: user.nickname,
      email: user.email,
      following_num: count_following,
      follower_num: count_follower,
      review_num: count_review,
      bookmark_num: count_bookmark,
      is_following: is_following,
      reviews: review_list,
      bookmarks: bookmark_list,
    };

    return data;
  } catch (error) {
    console.error("Error getting user's profile: Service", error);
    throw error;
  }
};

/**
 * 팔로우 하기
 * 접속중인 유저가 누군가를 follow할때를 가정한 서비스
 * (그래서 user_id는 항상 로그인 중인 주체를 의미함)
 * 순서 : 하는 사람, 당하는 사람
 */
const do_follow = async (user_id: string, to_user_id: string) => {
  try {
    const follow = new Follows({
      from_user_id: user_id,
      to_user_id: to_user_id,
    });

    await follow.save();
    await notification_service.make_follow_notification(
      "팔로우",
      to_user_id,
      user_id
    );
  } catch (error) {
    console.error("Error following someone: Service", error);
    throw error;
  }
};

/**
 * 팔로우 취소 하기
 * 접속중인 유저가 누군가를 follow 취소할때를 가정한 서비스
 * (그래서 user_id는 항상 로그인 중인 주체를 의미함)
 * 순서 : 하는 사람, 당하는 사람
 */
const cancel_follow = async (user_id: string, to_user_id: string) => {
  try {
    const follow_id = await Follows.findOne({
      from_user_id: user_id,
      to_user_id: to_user_id,
    }).select("_id");

    await Follows.findByIdAndDelete(follow_id);
  } catch (error) {
    console.error("Error cancel following someone: Service", error);
    throw error;
  }
};

/**
 * 특정 유저의 팔로워 목록 반환
 * user_id : 내 id
 * opponent_id : 특정 유저의 id
 */
const get_others_follower = async (
  user_id: string,
  opponent_id: string
): Promise<follow_res_dto> => {
  try {
    const follower_list: follow_item_dto[] = [];

    // 특정 유저를 팔로우하는 사람들의 리스트를 가져옴
    const follows = await Follows.find({ to_user_id: opponent_id });

    for (const follow of follows) {
      const follows_user = await mypage_service_utils.find_user_by_id(
        follow.from_user_id.toString()
      );

      // 내가 그 리스트 사람들을 팔로우하고 있는지 확인하는 작업
      const find_is_follow = await mypage_service_utils.is_follow(
        user_id,
        follow.from_user_id.toString()
      );

      follower_list.push({
        user_id: follows_user._id,
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
    console.error("Error getting someone's follower: ServiceUtils", error);
    throw error;
  }
};

/**
 * 특정 유저의 팔로잉 목록 반환
 * user_id : 내 id
 * opponent_id : 특정 유저의 id
 */
const get_others_following = async (
  user_id: string,
  opponent_id: string
): Promise<follow_res_dto> => {
  try {
    const following_list: follow_item_dto[] = [];

    // 특정 유저가 팔로우하는 사람들의 리스트를 가져옴
    const follows = await Follows.find({ from_user_id: opponent_id });

    for (const follow of follows) {
      const followed_user = await mypage_service_utils.find_user_by_id(
        follow.to_user_id.toString()
      );

      // 내가 상대를 팔로우하고있는지 확인하는 작업
      const find_is_follow = await mypage_service_utils.is_follow(
        user_id,
        follow.from_user_id.toString()
      );

      following_list.push({
        user_id: followed_user._id,
        nickname: followed_user.nickname,
        email: followed_user.email,
        is_following: find_is_follow,
      });
    }

    const data: follow_res_dto = {
      follow_list: following_list,
    };

    return data;
  } catch (error) {
    console.error("Error getting someone's following: ServiceUtils", error);
    throw error;
  }
};
export {
  get_user_profile,
  do_follow,
  cancel_follow,
  get_others_follower,
  get_others_following,
};
