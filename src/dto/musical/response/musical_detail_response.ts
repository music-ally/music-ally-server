import mongoose from "mongoose"
import review_musical_detail_response_dto from "../../review/response/review_musical_detail_response";


/*export interface musical_detail_casting_dto{ 
    actor_id: mongoose.Types.ObjectId;
    actor_name: string;
} 만약 뮤지컬 상세 모달에서 배우 이름 클릭시 배우 화면으로 넘어가게 할거면 actor_id도 보내야해서 이렇게 해야함*/

export interface musical_detail_response_dto{
    musical_id: mongoose.Types.ObjectId;
    poster_uri: string;
    musical_name: string;
    is_bookmark:boolean;
    synopsis: string; //줄거리 #근데 이거 하면 뮤지컬 schema에도 넣어야하지 않나
    castings: string[];
    start_at: Date;
    end_at: Date;
    theater_name: string;
    theater_address: string; //theater schema에 추가해야할 것 같음
    reviews:review_musical_detail_response_dto[];
}
