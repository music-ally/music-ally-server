import axios from "axios";
import * as cheerio from "cheerio";

interface Musical {
  title: string;
  date: string;
  place: string;
  cast: string[];
}

const baseURL = "http://www.playdb.co.kr/playdb/playdblist.asp?";

const fetchMusicals = async (
  sPlayType: number,
  page?: number,
  sStartYear?: number
): Promise<Musical[]> => {
  const params: any = {
    sReqMainCategory: "000001",
    sReqSubCategory: "001005",
    sReqTab: 2,
    sPlayType: sPlayType,
    sSelectType: 2,
  };

  if (sStartYear) {
    params.sStartYear = sStartYear;
  }

  if (page) {
    params.Page = page;
  }

  try {
    console.log("Fetching musicals with params:", params);
    const response = await axios.get(baseURL, { params });
    const $ = cheerio.load(response.data);
    const musicals: Musical[] = [];

    $(".contents a").each((index, element) => {
      const title = $(element).find("td b a").text().trim();
      const info = $(element).find("td").eq(2).html() || "";
      const dateMatch = info.match(/일시\s*:\s*([\d.]+)\s*~\s*([\d.]+)/);
      const placeMatch = info.match(/장소\s*:\s*<a [^>]*>([^<]+)<\/a>/);
      const castMatch = info.match(/출연\s*:\s*(.*?)<a [^>]*>/);

      if (
        title &&
        dateMatch &&
        dateMatch.length === 3 &&
        placeMatch &&
        castMatch
      ) {
        const startDate = dateMatch[1];
        const endDate = dateMatch[2];
        const place = placeMatch[1];
        const cast = castMatch[1]
          .split(", ")
          .map((actor) => actor.replace(/<.*?>/g, "").trim());
          
        musicals.push({
          title,
          date: `${startDate} ~ ${endDate}`,
          place,
          cast,
        });
      }
    });

    return musicals;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

const fetchAllMusicals = async () => {
  const allMusicals: Musical[] = [];

  try {
    // 현재 공연 중
    for (let page = 1; page <= 10; page++) {
      const musicals = await fetchMusicals(2, page);
      allMusicals.push(...musicals);
    }

    // 개막 예정
    for (let page = 1; page <= 10; page++) {
      const musicals = await fetchMusicals(3, page);
      allMusicals.push(...musicals);
    }

    // 과거 공연 (연도별)
    for (let year = 2019; year >= 2007; year--) {
      for (let page = 1; page <= 10; page++) {
        const musicals = await fetchMusicals(1, page, year);
        allMusicals.push(...musicals);
      }
    }
  } catch (error) {
    console.error("Error fetching all musicals:", error);
    throw error;
  }

  return allMusicals;
};

export { fetchMusicals, fetchAllMusicals };
