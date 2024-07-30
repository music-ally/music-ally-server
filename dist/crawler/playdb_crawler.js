"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetch_all_theaters = exports.fetch_theater_details = exports.fetch_theaters = exports.fetch_all_actors = exports.fetch_actor_details = exports.fetch_actors = exports.fetch_all_castings = exports.fetch_cast_only = exports.fetch_musicals_castings = exports.fetch_all_musicals = exports.fetch_cast = exports.fetch_musical_details = exports.fetch_musicals = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
const playdb_crawler_util = __importStar(require("./playdb_crawler_util"));
// crawling해줄 기본 URL지정
const musical_list_base_URL = "http://www.playdb.co.kr/playdb/playdblist.asp?";
const musical_URL = "http://www.playdb.co.kr/playdb/playdbDetail.asp?";
const actor_base_URL = "http://www.playdb.co.kr/artistdb/list.asp?code=013003";
const actor_list_base_URL = "http://www.playdb.co.kr/artistdb/list_iframe.asp";
const actor_URL = "http://www.playdb.co.kr/artistdb/detail.asp?";
const theater_list_base_URL = "http://www.playdb.co.kr/placedb/placedbList.asp?";
const theater_URL = "http://www.playdb.co.kr/placedb/PlacedbInfo.asp?";
// ---------------------------------MUSICAL---------------------------------
/**
 * 기본 페이지 위에
 * 뮤지컬 리스트
 * 크롤링
 */
const fetch_musicals = (sPlayType, page, sStartYear) => __awaiter(void 0, void 0, void 0, function* () {
    // 크롤링 사이트 파라미터 기본설정(ㄱㄴㄷ순으로 받아옴)
    const params = {
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
        const response = yield axios_1.default.get(musical_list_base_URL, {
            params,
            responseType: "arraybuffer", // 바이트 배열로 응답을 받음
        });
        const decodedData = iconv_lite_1.default.decode(Buffer.from(response.data), "EUC-KR"); // 인코딩을 EUC-KR로 변환
        const $ = cheerio.load(decodedData);
        const musicals = [];
        let startCollecting = false;
        const rows = $("table > tbody > tr").toArray();
        for (const element of rows) {
            const text = $(element).text();
            if (text.includes("주간인기도순") ||
                text.includes("누적인기도순") ||
                text.includes("공연일순") ||
                text.includes("ㄱㄴㄷ")) {
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
                    const musical_details = yield fetch_musical_details(string_musical_ID);
                    const musical_ID = parseInt(string_musical_ID);
                    musicals.push({
                        musical_ID,
                        musical_details,
                    });
                }
            }
        }
        return musicals;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
});
exports.fetch_musicals = fetch_musicals;
/**
 * 뮤지컬ID를 이용해
 * 해당 뮤지컬의 상세 정보
 * 크롤링
 */
const fetch_musical_details = (musicalId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${musical_URL}sReqPlayno=${musicalId}`;
    try {
        const response = yield axios_1.default.get(url, {
            responseType: "arraybuffer",
        });
        const decodedData = iconv_lite_1.default.decode(Buffer.from(response.data), "EUC-KR");
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
        const website = $("p a[href*='ticket.interpark.com/gate']").attr("href") || "";
        // 중복된 캐스트 제거
        const cast = yield fetch_cast(musicalId);
        // 중복된 캐스트 제거
        const unique_casts = cast.reduce((acc, current) => {
            const x = acc.find((item) => item.role === current.role);
            if (!x) {
                return acc.concat([current]);
            }
            else {
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
    }
    catch (error) {
        console.error("Error fetching musical's details:", error);
        throw error;
    }
});
exports.fetch_musical_details = fetch_musical_details;
/**
 * 뮤지컬ID를 이용해
 * 해당 뮤지컬의 출연 배우
 * 크롤링
 */
const fetch_cast = (musicalId) => __awaiter(void 0, void 0, void 0, function* () {
    const allCasts = [];
    const url = `${musical_URL}sReqPlayno=${musicalId}`;
    try {
        const response = yield axios_1.default.get(url, {
            responseType: "arraybuffer",
        });
        const decodedData = iconv_lite_1.default.decode(Buffer.from(response.data), "EUC-KR");
        const $ = cheerio.load(decodedData);
        // 출연진 정보를 포함하는 table 요소를 선택
        const castTable = $("div.detail_contentsbox table");
        // table 내의 각 tr 요소를 순회하면서 출연진 정보 파싱
        castTable.find("tr").each((index, element) => {
            // role과 각 배우의 이름을 포함하는 td 요소를 선택
            const roleTd = $(element).find("td").eq(0);
            const actorsTd = $(element).find("td").slice(1);
            const role = roleTd.find("b").text().trim();
            const cast_names = [];
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
    }
    catch (error) {
        console.error("Error fetching casts:", error);
        throw error;
    }
});
exports.fetch_cast = fetch_cast;
/**
 * 뮤지컬 크롤링을 위한
 * 페이지 탐색
 */
const fetch_all_musicals = () => __awaiter(void 0, void 0, void 0, function* () {
    const allMusicals = [];
    try {
        // 연도별 공연 반환
        // 2024년도부터 2020년도까지 fetch해옴
        for (let year = 2024; year >= 2024; year--) {
            const last_page = yield playdb_crawler_util.find_last_page_params(1, year);
            for (let page = 1; page <= 1; page++) {
                const musicals = yield fetch_musicals(1, page, year);
                allMusicals.push(...musicals);
            }
        }
        // 중복 제거
        const uniqueMusicals = allMusicals.filter((v, i, a) => a.findIndex((t) => t.musical_ID === v.musical_ID) === i);
        return uniqueMusicals;
    }
    catch (error) {
        console.error("Error fetching all musicals:", error);
        throw error;
    }
});
exports.fetch_all_musicals = fetch_all_musicals;
// ---------------------------------CASTING---------------------------------
/**
 * 기본 페이지 위에
 * 뮤지컬 리스트
 * 크롤링
 */
const fetch_musicals_castings = (sPlayType, page, sStartYear) => __awaiter(void 0, void 0, void 0, function* () {
    // 크롤링 사이트 파라미터 기본설정(ㄱㄴㄷ순으로 받아옴)
    const params = {
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
        console.log("Fetching castings.. 👩🧑👨", params);
        const response = yield axios_1.default.get(musical_list_base_URL, {
            params,
            responseType: "arraybuffer", // 바이트 배열로 응답을 받음
        });
        const decodedData = iconv_lite_1.default.decode(Buffer.from(response.data), "EUC-KR"); // 인코딩을 EUC-KR로 변환
        const $ = cheerio.load(decodedData);
        const castings = [];
        let startCollecting = false;
        const rows = $("table > tbody > tr").toArray();
        for (const element of rows) {
            const text = $(element).text();
            if (text.includes("주간인기도순") ||
                text.includes("누적인기도순") ||
                text.includes("공연일순") ||
                text.includes("ㄱㄴㄷ")) {
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
                    const musical_ID = parseInt(string_musical_ID);
                    const cast = yield fetch_cast_only(string_musical_ID);
                    castings.push({ musical_ID, cast });
                }
            }
        }
        return castings;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
});
exports.fetch_musicals_castings = fetch_musicals_castings;
/**
 * 뮤지컬ID를 이용해
 * 해당 뮤지컬의 출연 배우
 * 크롤링
 */
const fetch_cast_only = (musicalId) => __awaiter(void 0, void 0, void 0, function* () {
    const allCasts = [];
    const url = `${musical_URL}sReqPlayno=${musicalId}`;
    try {
        const response = yield axios_1.default.get(url, {
            responseType: "arraybuffer",
        });
        const decodedData = iconv_lite_1.default.decode(Buffer.from(response.data), "EUC-KR");
        const $ = cheerio.load(decodedData);
        // 출연진 정보를 포함하는 table 요소를 선택
        const castTable = $("div.detail_contentsbox table");
        // table 내의 각 tr 요소를 순회하면서 출연진 정보 파싱
        castTable.find("tr").each((index, element) => {
            // role과 각 배우의 이름을 포함하는 td 요소를 선택
            const roleTd = $(element).find("td").eq(0);
            const actorsTd = $(element).find("td").slice(1);
            const role = roleTd.find("b").text().trim();
            const cast_names = [];
            // 각 역의 캐스트 이름과 ID 추출
            actorsTd.each((index, actorTd) => {
                const actorAnchor = $(actorTd).find("a");
                const actorName = actorAnchor.text().trim();
                const actorHref = actorAnchor.attr("href");
                if (actorName && actorHref) {
                    const actorID = parseInt(actorHref.split("ManNo=")[1]);
                    cast_names.push({ name: actorName, actor_ID: actorID });
                }
            });
            // 캐스트 이름이 하나 이상인 경우에만 추가
            if (cast_names.length > 0) {
                allCasts.push({ role, cast_names });
            }
        });
        const uniqueCasts = {};
        allCasts.forEach((cast) => {
            if (!uniqueCasts[cast.role]) {
                uniqueCasts[cast.role] = cast.cast_names;
            }
            else {
                const existingNames = uniqueCasts[cast.role].map((actor) => actor.name);
                cast.cast_names.forEach((actor) => {
                    if (!existingNames.includes(actor.name)) {
                        uniqueCasts[cast.role].push(actor);
                    }
                });
            }
        });
        return Object.keys(uniqueCasts).map((role) => ({
            role,
            cast_names: uniqueCasts[role],
        }));
        return allCasts;
    }
    catch (error) {
        console.error("Error fetching casts:", error);
        throw error;
    }
});
exports.fetch_cast_only = fetch_cast_only;
/**
 * 캐스팅 크롤링을 위한
 * 페이지 탐색
 */
const fetch_all_castings = () => __awaiter(void 0, void 0, void 0, function* () {
    const allCastings = [];
    try {
        // 연도별 캐스팅 반환
        // 2024년도부터 2020년도까지 fetch해옴
        for (let year = 2024; year >= 2020; year--) {
            const last_page = yield playdb_crawler_util.find_last_page_params(1, year);
            for (let page = 1; page <= last_page; page++) {
                const castings = yield fetch_musicals_castings(1, page, year);
                allCastings.push(...castings);
            }
        }
        // 중복 제거
        const uniqueCastings = allCastings.filter((v, i, a) => a.findIndex((t) => t.musical_ID === v.musical_ID) === i);
        return uniqueCastings;
    }
    catch (error) {
        console.error("Error fetching all castings:", error);
        throw error;
    }
});
exports.fetch_all_castings = fetch_all_castings;
// ---------------------------------ACTOR---------------------------------
/**
 * 기본 페이지 위에
 * 배우 리스트
 * 크롤링
 */
const fetch_actors = (page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 접속할 페이지 url
        const actor_list_URL = `${actor_list_base_URL}?Page=${page}&code=013003&sub_code=&ImportantSelect=&ClickCnt=Y&NameSort=&Country=Y&TKPower=&WeekClickCnt=&NameStart=&NameEnd=`;
        // 크롤링 시작 콘솔 로그
        console.log("Fetching artist list 🧑‍🎨 :", actor_list_URL);
        const response = yield axios_1.default.get(actor_list_URL, {
            responseType: "arraybuffer",
        });
        const decodedData = iconv_lite_1.default.decode(Buffer.from(response.data), "EUC-KR"); // 인코딩을 EUC-KR로 변환
        const $ = cheerio.load(decodedData);
        const actors = [];
        let startCollecting = false;
        const rows = $("table > tbody > tr").toArray();
        for (const element of rows) {
            const text = $(element).text();
            if (text.includes("성명") ||
                text.includes("직업") ||
                text.includes("최근공연")) {
                startCollecting = true;
            }
            if (startCollecting) {
                const nameElement = $(element).find("td a").first();
                if (nameElement.length) {
                    const hrefAttr = nameElement.attr("href");
                    const actorIDMatch = hrefAttr ? hrefAttr.match(/ManNo=(\d+)/) : null; // ManNo 뒤에 뮤지컬 고유 숫자 추출
                    const string_actor_ID = actorIDMatch ? actorIDMatch[1] : "N/A";
                    // 뮤지컬 상세 정보 반환 함수 호출
                    const actor_details = yield fetch_actor_details(string_actor_ID);
                    const actor_ID = parseInt(string_actor_ID);
                    actors.push({
                        actor_ID,
                        actor_details,
                    });
                }
            }
        }
        return actors;
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
});
exports.fetch_actors = fetch_actors;
/**
 * 배우ID를 이용해
 * 해당 배우의 상세 정보
 * 크롤링
 */
const fetch_actor_details = (actorId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${actor_URL}ManNo=${actorId}`;
    try {
        const response = yield axios_1.default.get(url, {
            responseType: "arraybuffer",
        });
        const decodedData = iconv_lite_1.default.decode(Buffer.from(response.data), "EUC-KR");
        const $ = cheerio.load(decodedData);
        // 아티스트 세부사항 크롤링
        const fullName = $("span.title").text().trim();
        const koreanName = fullName.split("|")[0].trim();
        const profile_image = $("img.mainimg").attr("src");
        const job = $('dt:contains("직업")').next("dd").text().trim();
        const debut = $('dt:contains("데뷔년도")').next("dd").text().trim();
        const birthday = $('dt:contains("생년월일")').next("dd").text().trim();
        const physical = $('dt:contains("신체조건")').next("dd").text().trim();
        const agency = $('dt:contains("소속사")').next("dd").text().trim();
        return {
            name: koreanName,
            profile_image: profile_image || "",
            job,
            debut,
            birthday,
            physical,
            agency,
        };
    }
    catch (error) {
        console.error("Error fetching actor details:", error);
        throw error;
    }
});
exports.fetch_actor_details = fetch_actor_details;
/**
 * 배우 크롤링을 위한
 * 페이지 탐색
 */
const fetch_all_actors = () => __awaiter(void 0, void 0, void 0, function* () {
    const allActors = [];
    try {
        const last_page = yield playdb_crawler_util.find_last_page_url(actor_base_URL);
        for (let page = 1; page <= last_page; page++) {
            const actors = yield fetch_actors(page);
            allActors.push(...actors);
            yield new Promise((resolve) => setTimeout(resolve, 50)); // 0.1초 대기
        }
        // 중복 제거
        const uniqueActors = allActors.filter((v, i, a) => a.findIndex((t) => t.actor_ID === v.actor_ID) === i);
        return uniqueActors;
    }
    catch (error) {
        console.error("Error fetching all artists:", error);
        throw error;
    }
});
exports.fetch_all_actors = fetch_all_actors;
// ---------------------------------THEATER---------------------------------
/**
 * 기본 페이지 위에
 * 공연장 리스트
 * 크롤링
 */
const fetch_theaters = (page) => __awaiter(void 0, void 0, void 0, function* () {
    // 크롤링 사이트 파라미터 기본설정(ㄱㄴㄷ순으로 받아옴)
    const params = {
        Page: page,
        strTab: 2,
    };
    try {
        // 크롤링 시작 콘솔 로그
        console.log("Fetching theaters... 🏤", params);
        const response = yield axios_1.default.get(theater_list_base_URL, {
            params,
            responseType: "arraybuffer",
        });
        const decodedData = iconv_lite_1.default.decode(Buffer.from(response.data), "EUC-KR"); // 인코딩을 EUC-KR로 변환
        const $ = cheerio.load(decodedData);
        const theaters = [];
        let startCollecting = false;
        const rows = $("table > tbody > tr").toArray();
        for (const element of rows) {
            const text = $(element).text();
            if (text.includes("공연장명") ||
                text.includes("지역") ||
                text.includes("최근주요작품")) {
                startCollecting = true;
                continue;
            }
            if (startCollecting) {
                const idElement = $(element).find("td a[href*='PlacedbInfo.asp?PlacecCD=']");
                const titleElement = $(element).find("td").eq(4); // 지역이 위치한 td
                const locationElement = $(element).find("td").eq(6);
                if (idElement.length && titleElement.length && locationElement.length) {
                    const hrefAttr = idElement.attr("href");
                    const theaterIDMatch = hrefAttr
                        ? hrefAttr.match(/PlacecCD=(\d+)/)
                        : null; // PlacecCD 뒤에 공연장 고유 숫자 추출
                    const string_theater_ID = theaterIDMatch ? theaterIDMatch[1] : "N/A";
                    const name = titleElement.text().trim() || "";
                    const location = locationElement.text().trim() || "";
                    const theater_details = yield fetch_theater_details(string_theater_ID);
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
    }
    catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
});
exports.fetch_theaters = fetch_theaters;
/**
 * 배우 id를 이용해
 * 해당 배우의 상세 정보
 * 크롤링
 */
const fetch_theater_details = (placeId) => __awaiter(void 0, void 0, void 0, function* () {
    const url = `${theater_URL}PlacecCD=${placeId}`;
    try {
        const response = yield axios_1.default.get(url, {
            responseType: "arraybuffer",
        });
        const decodedData = iconv_lite_1.default.decode(Buffer.from(response.data), "EUC-KR");
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
        const seats = [];
        const imageElement = $('img[src="http://ticketimage.interpark.com/TicketImage/07playdb/07_db_tsang_title02.gif"]');
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
    }
    catch (error) {
        console.error("Error fetching place:", error);
        throw error;
    }
});
exports.fetch_theater_details = fetch_theater_details;
/**
 * 공연장 크롤링을 위한
 * 페이지 탐색
 */
const fetch_all_theaters = () => __awaiter(void 0, void 0, void 0, function* () {
    const allTheaters = [];
    try {
        const last_page = yield playdb_crawler_util.find_last_page_url(theater_list_base_URL);
        for (let page = 1; page <= last_page; page++) {
            const theaters = yield fetch_theaters(page);
            allTheaters.push(...theaters);
            yield new Promise((resolve) => setTimeout(resolve, 50));
        }
        // 중복 제거
        const uniqueTheaters = allTheaters.filter((v, i, a) => a.findIndex((t) => t.theater_ID === v.theater_ID) === i);
        return uniqueTheaters;
    }
    catch (error) {
        console.error("Error fetching all theaters:", error);
        throw error;
    }
});
exports.fetch_all_theaters = fetch_all_theaters;
//# sourceMappingURL=playdb_crawler.js.map