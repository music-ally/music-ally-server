import mongoose from "mongoose";
import Musicals from "../../schema/musicals";
import Reviews from "../../schema/reviews";
import { musical_main_item_dto } from "../../dto/musical/response/musical_main_res";
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

  // user에 age_group 컬럼을 만드는 게 나은가? 근데 그러면 age_group 관리는? 

  /* try {
    const user = await Users.findById(user_id);
    if (!user) {
      throw new Error('존재하지 않는 유저');
    }

    const birthday = user.birthday;
    const age_group = calculate_age(birthday);

    console.log(age_group);


    const musicals: musical_main_item_dto[] = filter_data.map(musical => ({
      musical_id: musical.musical_id,
      poster_image: musical.poster_image
    }));


    const data= {
      age_group: age_group,
      musicals: musicals
    }

    return data;

  } catch (error) {
    console.error("Error at musical_my_age_review: Service", error);
    throw error;
  }*/
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
  random_actor_musical,
  random_follow_musical,
  musical_my_age_review,
  musical_my_sex_review,
  musical_my_sex_bookmark,
  most_review_musical,
  most_bookmark_musical,
  bookmark,
  cancel_bookmark
};
