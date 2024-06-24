import mongoose from "mongoose"
import { review_musical_detail_res_dto } from "../../review/response/review_musical_detail_res";


/*export interface musical_detail_casting_dto{ 
    actor_id: mongoose.Types.ObjectId;
    actor_name: string;
} 만약 뮤지컬 상세 모달에서 배우 이름 클릭시 배우 화면으로 넘어가게 할거면 actor_id도 보내야해서 이렇게 해야함*/

export interface musical_detail_res_dto{
    musical_id: mongoose.Types.ObjectId;
    poster_image: string;
    musical_name: string;
    is_bookmark:boolean;
    synopsis: string; 
    castings: string[];
    start_at: Date;
    end_at: Date;
    theater_name: string;
    theater_address: string;
    reviews:review_musical_detail_res_dto[];
}
