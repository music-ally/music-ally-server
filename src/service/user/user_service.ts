import mongoose from "mongoose";
import { user_update_dto } from "../../dto/user/request/user_update";
import { user_update_response_dto } from "../../dto/user/response/user_update_response";
import users from "../../schema/users"

const update_user = async (
    userId: string,
    user_update_dto: user_update_dto
): Promise<user_update_response_dto> => {
    try{
        await users.findByIdAndUpdate(userId, user_update_dto)

        const data: user_update_response_dto = {
            password: user_update_dto.password,
            nickname: user_update_dto.nickname,
            birthday: user_update_dto.birthday,
            sex: user_update_dto.sex,
            profile_image: user_update_dto.profile_image
        }

        return data;
    } catch(error){
        throw error;
    }
};