import mongoose from "mongoose"
import { review_main_item_dto } from "../../review/response/review_main_res";
import { musical_main_item_dto } from "../../musical/response/musical_main_res";

export interface actor_detail_res_dto{
    actor_id: mongoose.Types.ObjectId;
    profile_image?: string;
    actor_name: string;
    birthday?: Date; 
    debut?: Date;
    agency?: string;
    job?: string;
    physical?: string;
    works_count: number; //works 리스트 내 개수로 파악할 수 있긴 한데 별도로 줄지?
    works: musical_main_item_dto[];
    reviews:review_main_item_dto[];
}
