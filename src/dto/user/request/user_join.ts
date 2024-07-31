export interface user_join_dto {
  email: string;
  password?: string;
  nickname: string;
  birthday: string; 
  sex: string;
  homearea_name: string;
  signup_method?: string;
  social_id?: string;
}
