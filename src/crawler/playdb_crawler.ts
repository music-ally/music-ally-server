import axios from "axios";
import * as cheerio from "cheerio";
import iconv from "iconv-lite";

interface Musical {
  musicalID: string;
  musicalDetails: MusicalDetails;
}

interface Casts {
  role: string;
  castNames: string[];
}

interface MusicalDetails {
  title: string;
  subTitle: string;
  genre: string;
  date: string;
  place: string;
  ageLimit: string;
  runtime: string;
  website: string;
  cast: Casts[];
}

const baseURL = "http://www.playdb.co.kr/playdb/playdblist.asp?";
const detailURL = "http://www.playdb.co.kr/playdb/playdbDetail.asp?";

// 대기 시간 추가 함수
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// 페이지 위 뮤지컬 리스트 크롤링
const fetchMusicals = async (
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
    console.log("Fetching musicals with params:", params);
    const response = await axios.get(baseURL, {
      params,
      responseType: 'arraybuffer', // 바이트 배열로 응답을 받음
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
          const musicalIDMatch = onclickAttr ? onclickAttr.match(/goDetail\('(\d+)'\)/) : null; // goDetail 뒤에 뮤지컬 고유 숫자 추출
          const musicalID = musicalIDMatch ? musicalIDMatch[1] : "N/A"; // 추출 숫자를 musicalID변수에 저장

          // 뮤지컬 상세 정보 반환 함수 호출
          const musicalDetails = await fetchMusicalDetails(musicalID);

          musicals.push({
            musicalID,
            musicalDetails,
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

// 뮤지컬ID를 이용해 해당 뮤지컬의 상세 정보(제목, 영어제목, 일시, 장소, 관람등급, 관람시간, 예매사이트, 출연진[]) 반환
const fetchMusicalDetails = async (
  musicalId: string
): Promise<MusicalDetails> => {
  const url = `${detailURL}sReqPlayno=${musicalId}`;

  try {
    console.log("Fetching musical's details with URL:", url);
    const response = await axios.get(url, {
      responseType: "arraybuffer",
    });

    const decodedData = iconv.decode(Buffer.from(response.data), "EUC-KR");
    const $ = cheerio.load(decodedData);

    const title = $(".pddetail_subject .title").text().trim();
    const subTitle = $(".pddetail_subject .entitle").text().trim();

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
    const place = $("img[alt='장소']")
      .closest("tr")
      .find("td a")
      .text()
      .trim();
    const ageLimit = $("img[alt='관람등급']")
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
    const cast: Casts[] = await fetchCast(musicalId);
    
    // 중복된 캐스트 제거
    const unique_casts = cast.reduce<Casts[]>((acc, current) => {
      const x = acc.find(item => item.role === current.role);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    return {
      title,
      subTitle,
      genre,
      date,
      place,
      ageLimit,
      runtime,
      website,
      cast: unique_casts // cast 배열에 중복 제거된 unique_casts 할당
    };
  } catch (error) {
    console.error("Error fetching musical's details:", error);
    throw error;
  }
};


// 뮤지컬 ID를 활용해 해당 뮤지컬의 배우 fetch해오기
const fetchCast = async (musicalId: string): Promise<Casts[] | any> => {
  const allCasts: Casts[] = [];
  const url = `${detailURL}sReqPlayno=${musicalId}`;

  try {
    console.log("Fetching musical's casts with URL:", url);
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

      const castNames: string[] = [];

      // 각 역의 캐스트 이름 추출
      $(element).find("td").slice(1).each((index, actor) => {
        const actorName = $(actor).find("a").text().trim();
        if (actorName !== "") { // 빈 문자열인 경우 제외
          castNames.push(actorName);
        }
      });

      // 캐스트 이름이 하나 이상인 경우에만 추가
      if (castNames.length > 0) {
        allCasts.push({ role, castNames });
      }
    });

    return allCasts;
  } catch (error) {
    console.error("Error fetching casts:", error);
    throw error;
  }
};




// 모든 페이지 탐색
const fetchAllMusicals = async (): Promise<Musical[]> => {
  const allMusicals: Musical[] = [];

  try {
    // 현재 공연 중
    for (let page = 1; page <= 1; page++) {
      const musicals = await fetchMusicals(2, page);
      allMusicals.push(...musicals);
      await delay(100); // 1.5초 대기
    }

    // 중복 제거
    const uniqueMusicals = allMusicals.filter(
      (v, i, a) => a.findIndex(t => t.musicalID === v.musicalID) === i
    );

    return uniqueMusicals;
  } catch (error) {
    console.error("Error fetching all musicals:", error);
    throw error;
  }
};

export { fetchMusicals, fetchMusicalDetails, fetchCast, fetchAllMusicals };
