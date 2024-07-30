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
exports.find_last_page_url = exports.find_last_page_params = void 0;
const axios_1 = __importDefault(require("axios"));
const cheerio = __importStar(require("cheerio"));
const iconv_lite_1 = __importDefault(require("iconv-lite"));
// crawling해줄 기본 URL지정
const musical_list_base_URL = "http://www.playdb.co.kr/playdb/playdblist.asp?";
// 대기 시간 추가 함수
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
/**
 * 전체 등록된 페이지 수 찾는 함수
 * - 여러 param에 따른 결과값 도출
 * - 뮤지컬만 사용
 */
const find_last_page_params = (sPlayType, sStartYear) => __awaiter(void 0, void 0, void 0, function* () {
    const params = {
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
        const response = yield axios_1.default.get(musical_list_base_URL, {
            params,
            responseType: "arraybuffer", // 바이트 배열로 응답을 받음
        });
        const decodedData = iconv_lite_1.default.decode(Buffer.from(response.data), "EUC-KR"); // 인코딩을 EUC-KR로 변환
        const $ = cheerio.load(decodedData);
        const totalText = $("td")
            .text()
            .match(/\[total\s\d+\/(\d+)\]/);
        if (totalText && totalText[1]) {
            const totalPages = parseInt(totalText[1], 10);
            return totalPages;
        }
        else {
            throw new Error("Total pages not found");
        }
    }
    catch (error) {
        console.error("Error finding last page", error);
        throw error;
    }
});
exports.find_last_page_params = find_last_page_params;
/**
 * 전체 등록된 페이지 수 찾는 함수
 * - url하나만 넣으면 결과값 도출
 * - actor, theater에 사용
 */
const find_last_page_url = (url) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get(url, {
            responseType: "arraybuffer", // 바이트 배열로 응답을 받음
        });
        const decodedData = iconv_lite_1.default.decode(Buffer.from(response.data), "EUC-KR"); // 인코딩을 EUC-KR로 변환
        const $ = cheerio.load(decodedData);
        const totalText = $("td")
            .text()
            .match(/\[total\s\d+\/(\d+)\]/);
        if (totalText && totalText[1]) {
            const totalPages = parseInt(totalText[1], 10);
            return totalPages;
        }
        else {
            throw new Error("Total pages not found");
        }
    }
    catch (error) {
        console.error("Error finding last page", error);
        throw error;
    }
});
exports.find_last_page_url = find_last_page_url;
//# sourceMappingURL=playdb_crawler_util.js.map