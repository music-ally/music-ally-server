import mongoose from "mongoose";
import Users from "../../schema/users";
import Follows from "../../schema/follows";
import * as notification_service from "../notification/notification_service";
import * as mypage_service_utils from "../mypage/mypage_service_utils";
import { user_profile_res_dto } from "../../dto/user/response/user_profile_res";
import { user_mypage_res_dto } from "../../dto/user/response/user_mypage_res";

/**
 * 내가 특정 유저의 팔로워인지 확인
 * (= 내가 특정 유저를 팔로우하는지 확인)
 */
const check_follow = async (user_id: string, to_user_id: string) => {
  try {
    const do_follow = await Follows.findOne({
      from_user_id: user_id,
      to_user_id: to_user_id,
    });

    if(do_follow) {
      return ("팔로잉");
    }
    else {
      return ("팔로우");
    }
  } catch (error) {
    console.error("Error checking I follow someone: Service", error);
    throw error;
  }
}

export {
    check_follow
}