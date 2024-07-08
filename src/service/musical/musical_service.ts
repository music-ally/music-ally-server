import mongoose from "mongoose";
import Musicals from "../../schema/musicals";
import Reviews from "../../schema/reviews";
import { musical_main_item_dto } from "../../dto/musical/response/musical_main_res";
import Bookmarks from "../../schema/bookmarks";

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
  most_review_musical,
  bookmark,
  cancel_bookmark
};
