import mongoose from "mongoose";
import Musicals from "../../schema/musicals";
import Reviews from "../../schema/reviews";
import { musical_main_item_dto, musical_main_res_dto } from "../../dto/musical/response/musical_main_res";
import { musical_main_age_res_dto } from "../../dto/musical/response/musical_main_age_res";
import Bookmarks from "../../schema/bookmarks";
import Users from "../../schema/users";
import { calculate_age } from "./musical_service_utils";
import { musical_search_item_dto, musical_search_res_dto } from "../../dto/musical/response/musical_search_res";
import Theaters from "../../schema/theaters";
import Actors from "../../schema/actors";
import { musical_main_actor_res_dto } from "../../dto/musical/response/musical_main_actor_res";
import Castings from "../../schema/castings";
import Follows from "../../schema/follows";
import { musical_main_follow_res_dto } from "../../dto/musical/response/musical_main_follow_res";
import { musical_detail_res_dto } from "../../dto/musical/response/musical_detail_res";
import Review_likes from "../../schema/review_likes";
import { musical_main_area_res_dto } from "../../dto/musical/response/musical_main_area_res";

const musical_detail = async (user_id:string, musical_id:string) => {
  try {
    
    const user_oid = new mongoose.Types.ObjectId(user_id);
    const musical_oid = new mongoose.Types.ObjectId(musical_id);
    const musical = await Musicals.findById(musical_oid);

    if (!musical){
      throw new Error("해당 뮤지컬 아이디의 뮤지컬을 찾을 수 없습니다");
    }

    //뮤지컬 조회수 증가
    musical.view++;
    await musical.save();

    const is_bookmark = Boolean(await Bookmarks.exists( { user_oid, musical_oid } ));

    const theater = await Theaters.findById(musical.theater_id);
    if (!theater){
      throw new Error("해당 극장 아이디의 극장을 찾을 수 없습니다");
    }

    console.log(musical_oid)

    const castings = await Castings.find({musical_id: musical_oid})
    .populate('actor_id')
    .exec() as any[];

    console.log(castings)

    const castings_names = castings.map((casting: any) => casting.actor_id.actor_name);
  
    console.log(castings_names)


    const review_data = await Reviews.find({musical_id: musical_oid })
    .populate('user_id')
    .populate('musical_id')
    .exec() as any[];
    
    const reviews = await Promise.all(review_data.map(async (review: any) => {
      const review_id = review._id;
    
      const is_like = Boolean(await Review_likes.exists({ user_id, review_id }));
      const like_num = await Review_likes.countDocuments({ review_id });
      const masked_email = `${review.user_id.email.slice(0, 2)}****`;
    
      return {
        review_id: review._id,
        reviewer_id: review.user_id,
        reviewer_profile_image: review.user_id.profile_image || null,
        reviewer_nickname: review.user_id.nickname,
        reviewer_email: masked_email,
        create_at: review.create_at,
        like_num: like_num,
        is_like: is_like,
        fear: review.fear,
        sensitivity: review.sensitivity,
        violence: review.violence,
        content: review.content,
      };
    }));

    const data: musical_detail_res_dto = {
      musical_id: musical_oid,
      poster_image: musical.poster_image,
      musical_name: musical.musical_name,
      is_bookmark: is_bookmark,
      musical_subname: musical.musical_subname,
      musical_genre: musical.musical_genre,
      age_limit: musical.age_limit,
      runtime: musical.runtime,
      website: musical.website,
      castings: castings_names,
      start_at: musical.start_at,
      end_at: musical.end_at,
      theater_name: theater.theater_name,
      theater_address: theater.theater_road_address ? theater.theater_road_address : theater.theater_address,
      reviews: reviews
    }

    return data

  } catch (error) {
    console.error("Error at get musical_detail: Service", error);
    throw error;
  }
}

const top_rank_musical = async () => {
  try {
    const filter_data = await Musicals.aggregate([
      {
        $sort: { view: -1 } //-1 : 내림차순
      },
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0, // 0 => 제외한다
          musical_id: "$_id",
          poster_image: "$poster_image"
        }
      }
    ]);

    return filter_data as musical_main_item_dto[];

  } catch (error) {
    console.error("Error at get top rank musical: Service", error);
    throw error;
  }
}

const random_actor_musical = async () => {
  try {

    const random_actor = await Castings.aggregate([
    {
      $group: {
        _id: "$actor_id",
        count: { $sum: 1 },
        musicals: { $addToSet: "$musical_id" }
      }
    },
    {
      $match: {
        count: { $gte: 4 }
      }
    },
    {
      $sample: { size: 1 }
    }
    ]);

    const actor = await Actors.findById(random_actor[0]._id);

    if (!actor) {
      throw new Error("선택 배우 정보 불러오기 실패");
    }

    const musicals = await Musicals.find({
      _id: { $in: random_actor[0].musicals }
    });

    const musical_dto : musical_main_item_dto[] = musicals.map(musical => ({
      musical_id: musical._id,
      poster_image: musical.poster_image,
    }))

    const data: musical_main_actor_res_dto = {
      actor_name: actor?.actor_name,
      musicals: musical_dto
    }

    return data

  } catch (error) {
    console.error("Error at get all musical: Service", error);
    throw error;
  }
}

const random_follow_musical = async (user_id: string) => {
  try {
    const random_follow = await Follows.aggregate([
      {
        $match: {
          from_user_id: new mongoose.Types.ObjectId(user_id)
        }
      },
      {
        $lookup: {
          from: "reviews",
          localField: "to_user_id",
          foreignField: "user_id",
          as: "reviews"
        }
      },
      {
        $addFields: {
          review_count: { $size: "$reviews" }
        }
      },
      {
        $match: {
          review_count: { $gte: 4 }
        }
      },
      {
        $sample: { size: 1 }
      },
      {
        $project: {
          to_user_id: 1,
          review_musical_ids: "$reviews.musical_id"
        }
      },
    ]);

    if (random_follow.length === 0) {
      throw new Error("리뷰가 4개 이상인 팔로우한 유저 없음");
    }

    console.log(random_follow);

    const to_user_id = random_follow[0].to_user_id;
    const to_user = await Users.findById(to_user_id);
    if (!to_user) {
      throw new Error("팔로우한 유저 찾을 수 없음");
    }

    const musicals = await Musicals.aggregate([
      {
        $match: {
          _id: { $in: random_follow[0].review_musical_ids }
        },
      },
      {
        $project: {
          musical_id: "$_id",
          poster_image: 1
        }
      }
    ]);

    const musical_dto: musical_main_item_dto[] = musicals.map(musical => ({
      musical_id: musical._id,
      poster_image: musical.poster_image,
    }));

    const data: musical_main_follow_res_dto = {
      follow_name: to_user.nickname,
      musicals: musical_dto
    };

    return data;

  } catch (error) {
    console.error("Error at get follow's reviewed musical: Service", error);
    throw error;
  }
}

const all_musical = async () => {
  try {

    const musicals = await Musicals.find()
      .populate({
        path: 'theater_id',
        model: Theaters,
        select: 'theater_name'
      }).exec() as any[]; //exec()의 필요성,, promise 반환? 인데 잘 모르겠음

    const musical_dto : musical_search_item_dto[] = musicals.map(musical => ({
      musical_id: musical._id,
      poster_image: musical.poster_image,
      musical_name: musical.musical_name,
      start_at: musical.start_at,
      end_at: musical.end_at,
      theater_name: musical.theater_id.theater_name
    }))

    const data: musical_search_res_dto = {
      musicals: musical_dto
    }

    return data

  } catch (error) {
    console.error("Error at get all musical: Service", error);
    throw error;
  }
}

const musical_my_age_review = async (user_id: string) => {
  try {
    const user = await Users.findById(user_id);
    if (!user) {
      throw new Error('존재하지 않는 유저');
    }

    const birthday = user.birthday;
    const age_group = calculate_age(birthday);

    const today_year = new Date().getFullYear()

    const age_lower_bound = new Date(today_year - age_group - 9, 0, 1); //js의 월은 0~11
    const age_upper_bound = new Date(today_year - age_group, 11, 31); 

    const filter_data = await Users.aggregate([
      {
        $match: {
          birthday: {
            $gte: age_lower_bound, //이상
            $lte: age_upper_bound //이하
          }
        }
      },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'user_id',
          as: 'reviews'
        }
      },
      {
        $unwind: '$reviews'
      },
      {
        $lookup: {
          from: 'musicals',
          localField: 'reviews.musical_id',
          foreignField: '_id',
          as: 'musical'
        }
      },
      {
        $unwind: '$musical'
      },
      {
        $group: {
          _id: '$musical._id',
          poster_image: { $first: '$musical.poster_image' }
        }
      },
      {
        $project: {
          musical_id: '$_id',
          poster_image: '$poster_image'
        }
      }
    ]);

    const musicals: musical_main_item_dto[] = filter_data.map(musical => ({
      musical_id: musical.musical_id,
      poster_image: musical.poster_image
    }));

    const data = {
      age_group: `${age_group}대`,
      musicals: musicals
    }

    return data;

  } catch (error) {
    console.error("Error at musical_my_age_review: Service", error);
    throw error;
  }
};

const musical_my_age_bookmark = async (user_id: string) => {
  try {
    const user = await Users.findById(user_id);
    if (!user) {
      throw new Error('존재하지 않는 유저');
    }

    const birthday = user.birthday;
    const age_group = calculate_age(birthday);

    const today_year = new Date().getFullYear()

    const age_lower_bound = new Date(today_year - age_group - 9, 0, 1); //js의 월은 0~11
    const age_upper_bound = new Date(today_year - age_group, 11, 31); 

    const filter_data = await Users.aggregate([
      {
        $match: {
          birthday: {
            $gte: age_lower_bound, //이상
            $lte: age_upper_bound //이하
          }
        }
      },
      {
        $lookup: {
          from: 'bookmarks',
          localField: '_id',
          foreignField: 'user_id',
          as: 'bookmarks'
        }
      },
      {
        $unwind: '$bookmarks'
      },
      {
        $lookup: {
          from: 'musicals',
          localField: 'bookmarks.musical_id',
          foreignField: '_id',
          as: 'musical'
        }
      },
      {
        $unwind: '$musical'
      },
      {
        $group: {
          _id: '$musical._id',
          poster_image: { $first: '$musical.poster_image' }
        }
      },
      {
        $project: {
          musical_id: '$_id',
          poster_image: '$poster_image'
        }
      }
    ]);

    const musicals: musical_main_item_dto[] = filter_data.map(musical => ({
      musical_id: musical.musical_id,
      poster_image: musical.poster_image
    }));

    const data = {
      age_group: `${age_group}대`,
      musicals: musicals
    }

    return data;

  } catch (error) {
    console.error("Error at musical_my_age_bookmark: Service", error);
    throw error;
  }
};


const musical_my_sex_review = async (user_id: string) => {
  try {
    const user = await Users.findById(user_id);
    if (!user) {
      throw new Error('존재하지 않는 유저');
    }

    const sex = user.sex;

    const filter_data = await Reviews.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $match: {
          "user.sex": sex
        }
      },
      {
        $group: {
          _id: "$musical_id",
          review_count: { $count: {} },
          poster_image: { $first: "$musical.poster_image" }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: "musicals",
          localField: "_id",
          foreignField: "_id",
          as: "musical"
        }
      },
      {
        $unwind: "$musical"
      },
      {
        $project: {
          musical_id: "$_id",
          poster_image: "$musical.poster_image"
        }
      }
    ]);

    const musicals: musical_main_item_dto[] = filter_data.map(musical => ({
      musical_id: musical.musical_id,
      poster_image: musical.poster_image
    }));

    const data = {
      sex: sex ? "여성" : "남성",
      musicals: musicals
    };

    return data;

  } catch (error) {
    console.error("Error at musical_my_sex_review: Service", error);
    throw error;
  }
};

const musical_my_sex_bookmark = async (user_id: string) => {
  try {
    const user = await Users.findById(user_id);
    if (!user) {
      throw new Error('존재하지 않는 유저');
    }

    const sex = user.sex;

    const filter_data = await Bookmarks.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "user_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      },
      {
        $match: {
          "user.sex": sex
        }
      },
      {
        $group: {
          _id: "$musical_id",
          bookmark_count: { $count: {} },
          poster_image: { $first: "$musical.poster_image" }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: "musicals",
          localField: "_id",
          foreignField: "_id",
          as: "musical"
        }
      },
      {
        $unwind: "$musical"
      },
      {
        $project: {
          musical_id: "$_id",
          poster_image: "$musical.poster_image"
        }
      }
    ]);

    const musicals: musical_main_item_dto[] = filter_data.map(musical => ({
      musical_id: musical.musical_id,
      poster_image: musical.poster_image
    }));

    const data = {
      sex: sex ? "여성" : "남성",
      musicals: musicals
    };

    return data;

  } catch (error) {
    console.error("Error at musical_my_sex_bookmark: Service", error);
    throw error;
  }
};


const most_review_musical = async (): Promise<musical_main_item_dto[]> => {
  try {
    const filter_data = await Reviews.aggregate([
      {
        $group: { //reviews 컬렉션에서 musical_id를 기준으로 그룹핑, $count로 그룹의 리뷰 개수 반환
          _id: "$musical_id",
          review_count: { $count: {} }
        }
      },
      {
        $sort: { review_count: -1 } //-1 : 내림차순
      },
      {
        $limit: 10
      },
      {
        $lookup: { //join
          from: "musicals",
          localField: "_id",
          foreignField: "_id",
          as: "musical"
        }
      },
      {
        $unwind: "$musical"
      },
      {
        $project: {
          _id: 0, // 0 => 제외한다
          musical_id: "$_id",
          poster_image: "$musical.poster_image"
        }
      }
    ]);

    return filter_data as musical_main_item_dto[];

  } catch (error) {
    console.error("Error at most_review_musical: Service", error);
    throw error;
  }
};

const most_bookmark_musical = async (): Promise<musical_main_item_dto[]> => {
  try {
    const filter_data = await Bookmarks.aggregate([
      {
        $group: { 
          _id: "$musical_id",
          bookmark_count: { $count: {} }
        }
      },
      {
        $sort: { bookmark_count: -1 }
      },
      {
        $limit: 10
      },
      {
        $lookup: {
          from: "musicals",
          localField: "_id",
          foreignField: "_id",
          as: "musical"
        }
      },
      {
        $unwind: "$musical"
      },
      {
        $project: {
          _id: 0, // 0 => 제외한다
          musical_id: "$_id",
          poster_image: "$musical.poster_image"
        }
      }
    ]);

    return filter_data as musical_main_item_dto[];

  } catch (error) {
    console.error("Error at most_bookmark_musical: Service", error);
    throw error;
  }
};


const ongoing_musical = async (): Promise<musical_main_item_dto[]> => {
  try {
    const today = new Date();

    const filter_data = await Musicals.aggregate([
      {
        $addFields: {
          trimmed_start_at: { $trim: { input: "$start_at" } },
          trimmed_end_at: { $trim: { input: "$end_at" } }
        }
      },
      {
        $match: {
          $expr: {
            $and: [
              { $lte: [{ $dateFromString: { dateString: "$trimmed_start_at", format: "%Y/%m/%d" } }, today] },
              { $gte: [{ $dateFromString: { dateString: "$trimmed_end_at", format: "%Y/%m/%d" } }, today] }
            ]
          }
        }
      },
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0, // 0 => 제외한다
          musical_id: "$_id",
          poster_image: "$poster_image"
        }
      }
    ]);

    return filter_data as musical_main_item_dto[];

  } catch (error) {
    console.error("Error at ongoing_musical: Service", error);
    throw error;
  }
};


const near_musical = async (user_id: string) => {
  try {
    const today = new Date();
    const user = await Users.findById(user_id).populate('homearea').exec() as any;
    const user_area = user.homearea.area_name.toString();

    const musicals = await Musicals.aggregate([
      {
        $lookup: {
          from: 'theaters',
          localField: 'theater_id',
          foreignField: '_id',
          as: 'theaters'
        }
      },
      {
        $unwind: '$theaters'
      },
      {
        $addFields: {
          trimmed_start_at: { $trim: { input: "$start_at" } },
          trimmed_end_at: { $trim: { input: "$end_at" } }
        }
      },
      {
        $match: {
          $expr: {
            $and: [
              { $lte: [{ $dateFromString: { dateString: "$trimmed_start_at", format: "%Y/%m/%d" } }, today] },
              { $gte: [{ $dateFromString: { dateString: "$trimmed_end_at", format: "%Y/%m/%d" } }, today] },
              { $eq: ["$theaters.area_id", user.homearea._id] }
            ]
          }
        }
      },
      {
        $limit: 10
      },
      {
        $project: {
          _id: 0,
          musical_id: "$_id",
          poster_image: "$poster_image",        
        }
      }
    ]);

    const data = {
      area: user_area,
      musicals: musicals
    };

    return data as musical_main_area_res_dto;

  } catch (error) {
    console.error("Error at near_musical: Service", error);
    throw error;
  }
};

const bookmark = async (user_id: string, musical_id: string) => {

  try {
    const bookmark = new Bookmarks({
      user_id: user_id,
      musical_id: musical_id
    });

    await bookmark.save();

    return

  } catch (error) {
    console.error("Error at bookmark: Service", error);
    throw error;
  }
};

const cancel_bookmark = async (user_id: string, musical_id: string) => {

  try {
    const bookmark = await Bookmarks.findOneAndDelete({
      user_id: user_id,
      musical_id: musical_id
    });

    return

  } catch (error) {
    console.error("Error at cancel_bookmark : Service", error);
    throw error;
  }
};

export {
  all_musical,
  musical_detail,
  top_rank_musical,
  random_actor_musical,
  random_follow_musical,
  musical_my_age_review,
  musical_my_age_bookmark,
  musical_my_sex_review,
  musical_my_sex_bookmark,
  most_review_musical,
  most_bookmark_musical,
  ongoing_musical,
  near_musical,
  bookmark,
  cancel_bookmark
};
