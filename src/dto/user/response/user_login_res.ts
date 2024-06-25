import { user_login_dto } from "../request/user_login";

export interface user_login_res_dto {
    email: string;
    access_token: string;
    refresh_token: string;  
}
