import user_login_dto from "../request/user_login";

export default interface user_login_response_dto extends user_login_dto {
    access_token: string;
    refresh_token: string;  
}
