import * as playdb_crawler from "../crawler/playdb_crawler";
import Musical from "../schema/musicals";
import { Musical_Details } from "../dto/crawling/musical_crawling_res";

const get_musicals = async () => {
  try {
    const data = await playdb_crawler.fetch_all_musicals();

    // 크롤링 후  저장?
    // for (const musical of musicals) {
    //   const existing_musical = await Musical.findOne({ musical_ID: musical.musical_ID });
    //   if (!existing_musical) {
    //     const data = new Musical({
    //       musical_name: musical_details_dto.title,
    //       musical_sub_name: musical_details_dto.sub_title,
    //       date: musical_details_dto.date,
    //       theater_id: musical_details_dto.place,
    //       age_limit: musical_details_dto.age_limit,
    //       runtime: musical_details_dto.runtime,
    //       purchase_web: musical_details_dto.website,
    //       poster_uri: musical_details_dto.image_url
    //     });
    //     const newMusical = new Musical(data);
    //     await newMusical.save();
    //   } else {
    //     await existing_musical.updateOne(musical);
    //   }
    // }

    return data;
  } catch (error) {
    console.error("Error in getMusicals service:", error);
    throw error;
  }
};

const get_actors = async () => {
  try{
    
    const data = await playdb_crawler.fetch_all_actors();
    return data

  } catch (error) {
    console.error("Error in getArtists service:", error);
    throw error;
  }
}

const get_theaters = async () => {
  try{
    
    const data = await playdb_crawler.fetch_all_theaters();
    return data

  } catch (error) {
    console.error("Error in getTheaters service:", error);
    throw error;
  }
}

export { 
  get_musicals,
  get_actors,
  get_theaters
};
