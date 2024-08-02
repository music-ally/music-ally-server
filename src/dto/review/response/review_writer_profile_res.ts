export interface review_writer_profile_res_dto{
    reviewer_profile_image: any;
    reviewer_nickname: string;
    reviewer_email: string; //앞의 2글자만 or 2글자외 나머지 마스킹해서 보내기
}