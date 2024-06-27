import axios from "axios";
import * as cheerio from "cheerio";
import iconv from "iconv-lite";
import * as playdb_crawler_util from "./playdb_crawler_util";
import {
  Musical,
  Casts,
  Musical_Details,
} from "../dto/crawling/musical_crawling_res";
import { Actor, Actor_Details } from "../dto/crawling/actor_crawling_res";
import { Theater, Theater_Details } from "../dto/crawling/theater_crawling_res";
import { last } from "cheerio/lib/api/traversing";

// crawling해줄 기본 URL지정
const musical_list_base_URL = "http://www.playdb.co.kr/playdb/playdblist.asp?";
const musical_URL = "http://www.playdb.co.kr/playdb/playdbDetail.asp?";
const actor_base_URL = "http://www.playdb.co.kr/artistdb/list.asp?code=013003";
const actor_list_base_URL = "http://www.playdb.co.kr/artistdb/list_iframe.asp";
const actor_URL = "http://www.playdb.co.kr/artistdb/detail.asp?";
const theater_list_base_URL =
  "http://www.playdb.co.kr/placedb/placedbList.asp?";
const theater_URL = "http://www.playdb.co.kr/placedb/PlacedbInfo.asp?";

// ---------------------------------MUSICAL---------------------------------
/**
 * 기본 페이지 위에
 * 뮤지컬 리스트
 * 크롤링
 */
const fetch_musicals = async (
  sPlayType: number,
  page: number,
  sStartYear?: number
): Promise<Musical[]> => {
  // 크롤링 사이트 파라미터 기본설정(ㄱㄴㄷ순으로 받아옴)
  const params: any = {
    Page: page,
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
    // 크롤링 시작 콘솔 로그
    console.log("Fetching musicals.. 🎭", params);
    const response = await axios.get(musical_list_base_URL, {
      params,
      responseType: "arraybuffer", // 바이트 배열로 응답을 받음
    });

    const decodedData = iconv.decode(Buffer.from(response.data), "EUC-KR"); // 인코딩을 EUC-KR로 변환
    const $ = cheerio.load(decodedData);
    const musicals: Musical[] = [];

    let startCollecting = false;
    const rows = $("table > tbody > tr").toArray();
    for (const element of rows) {
      const text = $(element).text();
      if (
        text.includes("주간인기도순") ||
        text.includes("누적인기도순") ||
        text.includes("공연일순") ||
        text.includes("ㄱㄴㄷ")
      ) {
        startCollecting = true;
      }

      if (startCollecting) {
        const titleElement = $(element).find("td b a");
        if (titleElement.length) {
          const onclickAttr = titleElement.attr("onclick");
          const musicalIDMatch = onclickAttr
            ? onclickAttr.match(/goDetail\('(\d+)'\)/)
            : null; // goDetail 뒤에 뮤지컬 고유 숫자 추출
          const string_musical_ID = musicalIDMatch ? musicalIDMatch[1] : "N/A"; // 추출 숫자를 musicalID변수에 저장

          // 뮤지컬 상세 정보 반환 함수 호출
          const musical_details = await fetch_musical_details(string_musical_ID);

          const musical_ID = parseInt(string_musical_ID);

          musicals.push({
            musical_ID,
            musical_details,
          });
        }
      }
    }

    return musicals;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

/**
 * 뮤지컬ID를 이용해
 * 해당 뮤지컬의 상세 정보
 * 크롤링
 */
const fetch_musical_details = async (
  musicalId: string
): Promise<Musical_Details> => {
  const url = `${musical_URL}sReqPlayno=${musicalId}`;

  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const decodedData = iconv.decode(Buffer.from(response.data), "EUC-KR");
    const $ = cheerio.load(decodedData);

    const image_url = $(".pddetail img").first().attr("src") || "";

    const title = $(".pddetail_subject .title").text().trim();
    const sub_title = $(".pddetail_subject .entitle").text().trim();

    // 'alt' 속성 값으로 세부 정보 추출
    const genre = $("img[alt='세부장르']")
      .closest("tr")
      .find("td")
      .eq(1)
      .text()
      .trim();
    const date = $("img[alt='일시']")
      .closest("tr")
      .find("td")
      .eq(1)
      .text()
      .trim();
    const place = $("img[alt='장소']").closest("tr").find("td a").text().trim();
    const age_limit = $("img[alt='관람등급']")
      .closest("tr")
      .find("td")
      .eq(1)
      .text()
      .trim();
    const runtime = $("img[alt='관람시간']")
      .closest("tr")
      .find("td")
      .eq(1)
      .text()
      .trim();

    const website =
      $("p a[href*='ticket.interpark.com/gate']").attr("href") || "";

    // 중복된 캐스트 제거
    const cast: Casts[] = await fetch_cast(musicalId);

    // 중복된 캐스트 제거
    const unique_casts = cast.reduce<Casts[]>((acc, current) => {
      const x = acc.find((item) => item.role === current.role);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    return {
      image_url,
      title,
      sub_title,
      genre,
      date,
      place,
      age_limit,
      runtime,
      website,
      cast: unique_casts, // cast 배열에 중복 제거된 unique_casts 할당
    };
  } catch (error) {
    console.error("Error fetching musical's details:", error);
    throw error;
  }
};

/**
 * 뮤지컬ID를 이용해
 * 해당 뮤지컬의 출연 배우
 * 크롤링
 */
const fetch_cast = async (musicalId: string): Promise<Casts[] | any> => {
  const allCasts: Casts[] = [];
  const url = `${musical_URL}sReqPlayno=${musicalId}`;

  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const decodedData = iconv.decode(Buffer.from(response.data), "EUC-KR");
    const $ = cheerio.load(decodedData);

    // 출연진 정보를 포함하는 table 요소를 선택
    const castTable = $("div.detail_contentsbox table");

    // table 내의 각 tr 요소를 순회하면서 출연진 정보 파싱
    castTable.find("tr").each((index, element) => {
      // role과 각 배우의 이름을 포함하는 td 요소를 선택
      const roleTd = $(element).find("td").eq(0);
      const actorsTd = $(element).find("td").slice(1);

      // role을 <b> 태그의 텍스트로 설정
      const role = roleTd.find("b").text().trim();

      const cast_names: string[] = [];

      // 각 역의 캐스트 이름 추출
      $(element)
        .find("td")
        .slice(1)
        .each((index, actor) => {
          const actorName = $(actor).find("a").text().trim();
          if (actorName !== "") {
            // 빈 문자열인 경우 제외
            cast_names.push(actorName);
          }
        });

      // 캐스트 이름이 하나 이상인 경우에만 추가
      if (cast_names.length > 0) {
        allCasts.push({ role, cast_names });
      }
    });

    return allCasts;
  } catch (error) {
    console.error("Error fetching casts:", error);
    throw error;
  }
};

/**
 * 뮤지컬 크롤링을 위한
 * 페이지 탐색
 */
const fetch_all_musicals = async (): Promise<Musical[]> => {
  const allMusicals: Musical[] = [];

  try {
    /* // 현재 공연 중인 공연 반환
    for (let page = 1; page <= 1; page++) {
      const musicals = await fetch_musicals(2, page);
      allMusicals.push(...musicals);
      await delay(100); // 0.1초 대기
    } */

    /* // 개막 예정 공연 반환
    for (let page = 1; page <= 10; page++) {
      const musicals = await fetch_musicals(3, page);
      allMusicals.push(...musicals);
    } */

    // 연도별 공연 반환
    // 2024년도부터 2020년도까지 fetc해옴
    for (let year = 2024; year >= 2020; year--) {
      const last_page = await playdb_crawler_util.find_last_page_params(
        1,
        year
      );
      for (let page = 1; page <= last_page; page++) {
        const musicals = await fetch_musicals(1, page, year);
        allMusicals.push(...musicals);
      }
    }

    // 중복 제거
    const uniqueMusicals = allMusicals.filter(
      (v, i, a) => a.findIndex((t) => t.musical_ID === v.musical_ID) === i
    );

    return uniqueMusicals;
  } catch (error) {
    console.error("Error fetching all musicals:", error);
    throw error;
  }
};

// ---------------------------------ACTOR---------------------------------
/**
 * 기본 페이지 위에
 * 배우 리스트
 * 크롤링
 */
const fetch_actors = async (page: number): Promise<Actor[]> => {
  try {
    // 접속할 페이지 url
    const actor_list_URL = `${actor_list_base_URL}?Page=${page}&code=013003&sub_code=&ImportantSelect=&ClickCnt=Y&NameSort=&Country=Y&TKPower=&WeekClickCnt=&NameStart=&NameEnd=`;

    // 크롤링 시작 콘솔 로그
    console.log("Fetching artist list 🧑‍🎨 :", actor_list_URL);
    const response = await axios.get(actor_list_URL, {
      responseType: "arraybuffer",
    });

    const decodedData = iconv.decode(Buffer.from(response.data), "EUC-KR"); // 인코딩을 EUC-KR로 변환
    const $ = cheerio.load(decodedData);
    const actors: Actor[] = [];

    let startCollecting = false;
    const rows = $("table > tbody > tr").toArray();
    for (const element of rows) {
      const text = $(element).text();
      if (
        text.includes("성명") ||
        text.includes("직업") ||
        text.includes("최근공연")
      ) {
        startCollecting = true;
      }

      if (startCollecting) {
        const nameElement = $(element).find("td a").first();
        if (nameElement.length) {
          const hrefAttr = nameElement.attr("href");
          const actorIDMatch = hrefAttr ? hrefAttr.match(/ManNo=(\d+)/) : null; // ManNo 뒤에 뮤지컬 고유 숫자 추출
          const string_actor_ID = actorIDMatch ? actorIDMatch[1] : "N/A";

          // 뮤지컬 상세 정보 반환 함수 호출
          const actor_details = await fetch_actor_details(string_actor_ID);

          const actor_ID = parseInt(string_actor_ID);

          actors.push({
            actor_ID,
            actor_details,
          });
        }
      }
    }

    return actors;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

/**
 * 배우ID를 이용해
 * 해당 배우의 상세 정보
 * 크롤링
 */
const fetch_actor_details = async (
  actorId: string
): Promise<Actor_Details[] | any> => {
  const url = `${actor_URL}ManNo=${actorId}`;
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const decodedData = iconv.decode(Buffer.from(response.data), "EUC-KR");
    const $ = cheerio.load(decodedData);

    // 아티스트 세부사항 크롤링
    const fullName = $("span.title").text().trim();
    const koreanName = fullName.split("|")[0].trim();
    const profile_image = $('img.mainimg').attr('src');
    const job = $('dt:contains("직업")').next("dd").text().trim();
    const debut = $('dt:contains("데뷔년도")').next("dd").text().trim();
    const birthday = $('dt:contains("생년월일")').next("dd").text().trim();
    const physical = $('dt:contains("신체조건")').next("dd").text().trim();
    const agency = $('dt:contains("소속사")').next("dd").text().trim();

    return {
      name: koreanName,
      profile_image: profile_image || '',
      job,
      debut,
      birthday,
      physical,
      agency,
    };
  } catch (error) {
    console.error("Error fetching actor details:", error);
    throw error;
  }
};

/**
 * 배우 크롤링을 위한
 * 페이지 탐색
 */
const fetch_all_actors = async (): Promise<Actor[]> => {
  const allActors: Actor[] = [];

  try {
    // 페이지 수를 설정 (예: 5페이지)
    const last_page = await playdb_crawler_util.find_last_page_url(
      actor_base_URL
    );

    for (let page = 1; page <= 1; page++) {
      const actors = await fetch_actors(page);
      allActors.push(...actors);
      await new Promise((resolve) => setTimeout(resolve, 100)); // 0.1초 대기
    }

    // 중복 제거
    const uniqueActors = allActors.filter(
      (v, i, a) => a.findIndex((t) => t.actor_ID === v.actor_ID) === i
    );

    return uniqueActors;
  } catch (error) {
    console.error("Error fetching all artists:", error);
    throw error;
  }
};

// ---------------------------------THEATER---------------------------------
/**
 * 기본 페이지 위에
 * 공연장 리스트
 * 크롤링
 */
const fetch_theaters = async (page: number): Promise<Theater[]> => {
  // 크롤링 사이트 파라미터 기본설정(ㄱㄴㄷ순으로 받아옴)
  const params: any = {
    Page: page,
    strTab: 2,
  };

  try {
    // 크롤링 시작 콘솔 로그
    console.log("Fetching theaters... 🏤", params);
    const response = await axios.get(theater_list_base_URL, {
      params,
      responseType: "arraybuffer", // 바이트 배열로 응답을 받음
    });

    const decodedData = iconv.decode(Buffer.from(response.data), "EUC-KR"); // 인코딩을 EUC-KR로 변환
    const $ = cheerio.load(decodedData);
    const theaters: Theater[] = [];

    let startCollecting = false;
    const rows = $("table > tbody > tr").toArray();
    for (const element of rows) {
      const text = $(element).text();
      if (
        text.includes("공연장명") ||
        text.includes("지역") ||
        text.includes("최근주요작품")
      ) {
        startCollecting = true;
        continue;
      }

      if (startCollecting) {
        const idElement = $(element).find(
          "td a[href*='PlacedbInfo.asp?PlacecCD=']"
        );
        const titleElement = $(element).find("td").eq(4); // 지역이 위치한 td
        const locationElement = $(element).find("td").eq(6);

        if (idElement.length && titleElement.length && locationElement.length) {
          const hrefAttr = idElement.attr("href");
          const theaterIDMatch = hrefAttr
            ? hrefAttr.match(/PlacecCD=(\d+)/)
            : null; // PlacecCD 뒤에 공연장 고유 숫자 추출
          const string_theater_ID = theaterIDMatch ? theaterIDMatch[1] : "N/A";
          const name = titleElement.text().trim();
          const location = locationElement.text().trim();

          const theater_details = await fetch_theater_details(string_theater_ID);

          const theater_ID = parseInt(string_theater_ID);

          theaters.push({
            theater_ID,
            name,
            location,
            theater_details,
          });
        }
      }
    }

    return theaters;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

/**
 * 배우 id를 이용해
 * 해당 배우의 상세 정보
 * 크롤링
 */
const fetch_theater_details = async (
  placeId: string
): Promise<Theater_Details> => {
  const url = `${theater_URL}PlacecCD=${placeId}`;
  try {
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const decodedData = iconv.decode(Buffer.from(response.data), "EUC-KR");
    const $ = cheerio.load(decodedData);

    let address = "";
    let road_address = "";

    // 주소와 도로명주소 반환
    $("tr").each((index, element) => {
      const rowText = $(element).text().trim();
      if (rowText.includes("주소:") && !rowText.includes("도로명주소:")) {
        address = rowText.replace("주소:", "").replace(/\s+/g, " ").trim();
      }
      if (rowText.includes("도로명주소:")) {
        road_address = rowText
          .replace("도로명주소:", "")
          .replace(/\s+/g, " ")
          .trim();
      }
    });
    // 좌석정보 반환
    const seats: string[] = [];
    const imageElement = $(
      'img[src="http://ticketimage.interpark.com/TicketImage/07playdb/07_db_tsang_title02.gif"]'
    );
    if (imageElement.length > 0) {
      const parentTable = imageElement.closest("table");
      const nextTable = parentTable
        .closest("tr")
        .next("tr")
        .find("table")
        .eq(0);

      nextTable.find("tr td b").each((index, element) => {
        const seatName = $(element).text().trim();
        if (seatName) {
          seats.push(seatName);
        }
      });
    }

    return {
      address,
      road_address,
      seats,
    };
  } catch (error) {
    console.error("Error fetching place:", error);
    throw error;
  }
};

/**
 * 공연장 크롤링을 위한
 * 페이지 탐색
 */
const fetch_all_theaters = async (): Promise<Theater[]> => {
  const allTheaters: Theater[] = [];

  try {
    // 페이지 수를 설정 (예: 5페이지)
    const last_page = await playdb_crawler_util.find_last_page_url(
      theater_list_base_URL
    );

    for (let page = 1; page <= last_page; page++) {
      const theaters = await fetch_theaters(page);
      allTheaters.push(...theaters);
      await new Promise((resolve) => setTimeout(resolve, 100)); // 0.1초 대기
    }

    // 중복 제거
    const uniqueTheaters = allTheaters.filter(
      (v, i, a) => a.findIndex((t) => t.theater_ID === v.theater_ID) === i
    );

    return uniqueTheaters;
  } catch (error) {
    console.error("Error fetching all artists:", error);
    throw error;
  }
};

export {
  fetch_musicals,
  fetch_musical_details,
  fetch_cast,
  fetch_all_musicals,
  fetch_actors,
  fetch_actor_details,
  fetch_all_actors,
  fetch_theaters,
  fetch_theater_details,
  fetch_all_theaters,
};
