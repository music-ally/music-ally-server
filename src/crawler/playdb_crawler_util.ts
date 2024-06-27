import axios from "axios";
import * as cheerio from "cheerio";
import iconv from "iconv-lite";

// crawling해줄 기본 URL지정
const musical_list_base_URL = "http://www.playdb.co.kr/playdb/playdblist.asp?";

// 대기 시간 추가 함수
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/**
 * 전체 등록된 페이지 수 찾는 함수
 * - 여러 param에 따른 결과값 도출
 * - 뮤지컬만 사용
 */
const find_last_page_params = async (
  sPlayType: number,
  sStartYear?: number
) => {
  const params: any = {
    sReqMainCategory: "000001",
    sReqTab: 5,
    sPlayType: sPlayType,
    sSelectType: 3,
  };

  // 선택연도 파라미터
  if (sStartYear) {
    params.sStartYear = sStartYear;
  }

  try {
    const response = await axios.get(musical_list_base_URL, {
      params,
      responseType: "arraybuffer", // 바이트 배열로 응답을 받음
    });

    const decodedData = iconv.decode(Buffer.from(response.data), "EUC-KR"); // 인코딩을 EUC-KR로 변환
    const $ = cheerio.load(decodedData);

    const totalText = $("td")
      .text()
      .match(/\[total\s\d+\/(\d+)\]/);
    if (totalText && totalText[1]) {
      const totalPages = parseInt(totalText[1], 10);
      return totalPages;
    } else {
      throw new Error("Total pages not found");
    }
  } catch (error) {
    console.error("Error finding last page", error);
    throw error;
  }
};

/**
 * 전체 등록된 페이지 수 찾는 함수
 * - url하나만 넣으면 결과값 도출
 * - actor, theater에 사용
 */
const find_last_page_url = async (url: string) => {
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer", // 바이트 배열로 응답을 받음
    });

    const decodedData = iconv.decode(Buffer.from(response.data), "EUC-KR"); // 인코딩을 EUC-KR로 변환
    const $ = cheerio.load(decodedData);

    const totalText = $("td")
      .text()
      .match(/\[total\s\d+\/(\d+)\]/);
    if (totalText && totalText[1]) {
      const totalPages = parseInt(totalText[1], 10);
      return totalPages;
    } else {
      throw new Error("Total pages not found");
    }
  } catch (error) {
    console.error("Error finding last page", error);
    throw error;
  }
};

export { find_last_page_params, find_last_page_url };
