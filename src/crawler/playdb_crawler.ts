import axios from "axios";
import * as cheerio from "cheerio";
import iconv from "iconv-lite";

interface Musical {
  musicalID: string;
  title: string;
  date: string;
  place: string;
  cast: string[];
}

const baseURL = "http://www.playdb.co.kr/playdb/playdblist.asp?";

// 대기 시간을 추가하는 함수
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const fetchMusicals = async (
  sPlayType: number,
  page?: number,
  sStartYear?: number
): Promise<Musical[]> => {
  const params: any = {
    sReqMainCategory: "000001",
    // sReqSubCategory: "001005",
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

    let startCollecting = false;
    $("table > tbody > tr").each((index, element) => {
      const text = $(element).text();
      if (text.includes("주간인기도순") || text.includes("누적인기도순") || text.includes("공연일순") || text.includes("ㄱㄴㄷ")) {
        startCollecting = true;
      }

      if (startCollecting) {
        const titleElement = $(element).find("td b a");
        if (titleElement.length) {
          const onclickAttr = titleElement.attr('onclick');
          const musicalIDMatch = onclickAttr ? onclickAttr.match(/goDetail\('(\d+)'\)/) : null;
          const musicalID = musicalIDMatch ? musicalIDMatch[1] : 'N/A';

          const title = titleElement.text().trim();
          const infoElement = $(element).next("tr").find("td").html() || "";

          const dateMatch = infoElement.match(/일시\s*:\s*([\d.]+)\s*~\s*([\d.]+)/);
          const placeMatch = infoElement.match(/장소\s*:\s*<a [^>]*>([^<]+)<\/a>/);
          const castMatch = infoElement.match(/출연\s*:\s*(.*?)<a [^>]*>/);

          const startDate = dateMatch ? dateMatch[1] : 'N/A';
          const endDate = dateMatch ? dateMatch[2] : 'N/A';
          const place = placeMatch ? placeMatch[1] : 'N/A';
          const cast = castMatch ? castMatch[1].trim().split(", ") : [];

          const date = `${startDate} ~ ${endDate}`;

          // N/A 데이터를 걸러내고 중복을 방지
          if (startDate !== 'N/A' && !musicals.some(musical => musical.title === title && musical.date === date)) {
            musicals.push({
              musicalID,
              title,
              date,
              place,
              cast,
            });
          }
        }
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
      await delay(1500); // 2초 대기
    }

    /* 
    // 개막 예정
    for (let page = 1; page <= 10; page++) {
      const musicals = await fetchMusicals(3, page);
      allMusicals.push(...musicals);
      await delay(2000); // 2초 대기
    }

    // 과거 공연 (연도별)
    for (let year = 2019; year >= 2007; year--) {
      for (let page = 1; page <= 10; page++) {
        const musicals = await fetchMusicals(1, page, year);
        allMusicals.push(...musicals);
        await delay(2000); // 2초 대기
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
