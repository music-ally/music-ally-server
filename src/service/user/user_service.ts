import mongoose from "mongoose";
import { user_info } from "../../dto/user/user_info";
import Users from "../../schema/users";
import Areas from "../../schema/areas";


const find_homearea_by_name = async(homearea : string) => {
  try {
    const data = await Areas.findOne({area_name : homearea}).select('_id')
    if (!data) {
      throw new Error('Homearea not found');
    }
    return data._id;
  } catch (error) {
    throw error;
  }
}

const create_user = async (user_create_dto : user_info) => {
  try {
    const user_homearea = await find_homearea_by_name(user_create_dto.homearea)

    const user = new Users({
      email: user_create_dto.email,
      password: user_create_dto.password,
      nickname: user_create_dto.nickname,
      birthday: user_create_dto.birthday,
      sex: user_create_dto.sex,
      profile_image: "null",
      homearea: user_homearea,
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

export { create_user, find_homearea_by_name };
