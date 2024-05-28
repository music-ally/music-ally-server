import axios from "axios";
import * as cheerio from "cheerio";
import iconv from "iconv-lite";

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
    const response = await axios.get(baseURL, {
      params,
      responseType: 'arraybuffer', // 바이트 배열로 응답을 받음
    });

    const decodedData = iconv.decode(Buffer.from(response.data), "EUC-KR"); // 인코딩을 EUC-KR로 변환
    const $ = cheerio.load(decodedData);
    const musicals: Musical[] = [];

    $("tr").each((index, element) => {
      const titleElement = $(element).find("td b a");
      if (titleElement.length) {
        const title = titleElement.text().trim();
        const infoElement = $(element).next("tr").find("td").html() || "";

        const dateMatch = infoElement.match(/일시\s*:\s*([\d.]+)\s*~\s*([\d.]+)/);
        const placeMatch = infoElement.match(/장소\s*:\s*<a [^>]*>([^<]+)<\/a>/);
        const castMatch = infoElement.match(/출연\s*:\s*(.*?)<a [^>]*>/);

        const startDate = dateMatch ? dateMatch[1] : 'N/A';
        const endDate = dateMatch ? dateMatch[2] : 'N/A';
        const place = placeMatch ? placeMatch[1] : 'N/A';
        const cast = castMatch ? [castMatch[1].trim()] : [];

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

const fetchAllMusicals = async (): Promise<Musical[]> => {
  const allMusicals: Musical[] = [];

  try {
    // 현재 공연 중
    for (let page = 1; page <= 10; page++) {
      const musicals = await fetchMusicals(2, page);
      allMusicals.push(...musicals);
    }

    /* 
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
    */

  } catch (error) {
    console.error("Error fetching all musicals:", error);
    throw error;
  }

  return allMusicals;
};

export { fetchMusicals, fetchAllMusicals };
