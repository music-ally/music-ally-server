import mongoose from "mongoose";
import Users from "../../schema/users";
import Follows from "../../schema/follows";

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

  } catch (error) {
    console.error("Error following someone: Service", error);
    throw error;
  }
};

/**
 * 팔로우 취소 하기
 * 접속중인 유저가 누군가를 folllow 취소할때를 가정한 서비스
 * (그래서 user_id는 항상 로그인 중인 주체를 의미함)
 * 순서 : 하는 사람, 당하는 사람
 */
const cancle_follow = async (user_id: string, to_user_id: string) => {
  try {
    const follow_id = await Follows.findOne({
        from_user_id: user_id,
        to_user_id: to_user_id,
    }).select("_id");

    await Follows.findByIdAndDelete(follow_id);

  } catch (error) {
    console.error("Error cancle following someone: Service", error);
    throw error;
  }
};

export { do_follow, cancle_follow };
