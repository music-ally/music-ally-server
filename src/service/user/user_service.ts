import mongoose from "mongoose";
import user_join_dto from "../../dto/user/request/user_join";
import user_login_dto from "../../dto/user/request/user_login";
import user_login_response_dto from "../../dto/user/response/user_login_response";

import Users from "../../schema/users";
import Areas from "../../schema/areas";
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from "../../utils/jwt_handler";



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

const create_user = async (user_join_dto : user_join_dto) => {
  try {
    const user_homearea_id = await find_homearea_by_name(user_join_dto.homearea_name)

    const user = new Users({
      email: user_join_dto.email,
      password: user_join_dto.password,
      nickname: user_join_dto.nickname,
      birthday: user_join_dto.birthday,
      sex: user_join_dto.sex, //sex를 string으로 받기 때문에 boolean값으로 변환하도록 수정해야함
      profile_image: "null",
      homearea: user_homearea_id,
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

const login_user = async (user_login_dto : user_login_dto): Promise<user_login_response_dto> => {
  const user = await Users.findOne({email : user_login_dto.email});
  
  if (!user){
    throw new Error('email not found');
  } else if (!(await bcrypt.compare(user_login_dto.password, user.password))) {
    throw new Error('wrong password');
  }
  const access_token = generateAccessToken(user._id);
  const refresh_token = generateRefreshToken(user._id);

  return { 
    email: user.email,
    password: user.password,
    access_token, 
    refresh_token 
  };
};

export { create_user, find_homearea_by_name, login_user };
