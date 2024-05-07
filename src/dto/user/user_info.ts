import mongoose from "mongoose";

export interface user_info {
    email: string;
    password: string;
    nickname: string;
    birthday: Date;
    sex: string;
    profile_image: string;
    noti_allow: boolean;
}
