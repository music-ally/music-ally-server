import mongoose from "mongoose";
import { user_join_dto } from "../../dto/user/request/user_join";
import { user_login_dto } from "../../dto/user/request/user_login";
import { user_login_res_dto } from "../../dto/user/response/user_login_res";
import Users from "../../schema/users";
import Areas from "../../schema/areas";
import bcrypt from 'bcryptjs';
import { generate_access_token, generate_refresh_token } from "../../utils/jwt_handler";



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

const join_user = async (user_join_dto : user_join_dto) => {
  try {
    const user_homearea_id = await find_homearea_by_name(user_join_dto.homearea_name)
    const birthday = new Date(user_join_dto.birthday)
    const sex = user_join_dto.sex === "여성" ? true : false; //true === 여성, false === 남성
    const hashed_password = await bcrypt.hash(user_join_dto.password, 10);

    const user = new Users({
      email: user_join_dto.email,
      password: hashed_password,
      nickname: user_join_dto.nickname,
      birthday: birthday,
      sex: sex, 
      homearea: user_homearea_id,
      noti_allow: true,
    });

    await user.save();

    const data = {
      _id: user._id,
    };
    
    return data;

  } catch (error) {
    console.error("Error at join: Service");
    throw error;
  }
};


const leave = async (user_id: string) => {
  try {
    const leave_data = {
      $set: {
        is_active: false,
        delete_date: new Date()
      }
    };
    
    await Users.findByIdAndUpdate(user_id, leave_data);

    return

  } catch (error) {
    console.error("Error at leave: Service");
    throw error;
  }
};

const login_user = async (user_login_dto : user_login_dto): Promise<user_login_res_dto> => {
  const user = await Users.findOne({email : user_login_dto.email});
  
  if (!user){
    throw new Error('email not found');
  } else if (!(await bcrypt.compare(user_login_dto.password, user.password))) {
    throw new Error('wrong password');
  } else if (!user.is_active){
    throw new Error('left user');
  }
  
  const access_token = generate_access_token(user._id);
  const refresh_token = generate_refresh_token(user._id);

  return { 
    email: user.email,
    access_token, 
    refresh_token 
  };
};


const check_email = async (email : string): Promise<boolean> => {
  const user = await Users.find({email : email});
  let is_duplicate;
  if (user.length === 0){
    is_duplicate = false
  } else {
    is_duplicate = true
  }
  
  return is_duplicate;
};

const check_nickname = async (nickname : string): Promise<boolean> => {
  const user = await Users.find({nickname : nickname});
  let is_duplicate;
  if (user.length === 0){
    is_duplicate = false
  } else {
    is_duplicate = true
  }
  
  return is_duplicate;
};



export {
  join_user,
  leave,
  find_homearea_by_name,
  login_user,
  check_email,
  check_nickname };
