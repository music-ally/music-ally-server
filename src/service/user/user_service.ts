import mongoose from "mongoose";
import { user_info } from "../../dto/user/user_info";
import Users from "../../schema/users";

const create_user = async (user_create_dto: user_info) => {
  try {
    const user = new Users({
      email: user_create_dto.email,
      password: user_create_dto.password,
      nickname: user_create_dto.nickname,
      birthday: user_create_dto.birthday,
      sex: user_create_dto.sex,
      profile_image: "null",
      noti_allow: true,
    });

    await user.save();

    const data = {
      _id: user._id,
    };

    return data;
  } catch (error) {
    throw error;
  }
};

export { create_user };
