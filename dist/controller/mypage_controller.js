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
exports.fetch_following = exports.fetch_follower = exports.update_profile = exports.delete_review = exports.fetch_mypage_review_detail = exports.fetch_my_profile = void 0;
const response_form_1 = __importDefault(require("../utils/response_form"));
const response_message_1 = __importDefault(require("../utils/response_message"));
const status_code_1 = __importDefault(require("../utils/status_code"));
const mypage_service = __importStar(require("../service/mypage/mypage_service"));
const mypage_service_utils = __importStar(require("../service/mypage/mypage_service_utils"));
/**
 * 내 프로필 반환
 */
const fetch_my_profile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield mypage_service.get_my_profile(req.user_id);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error fetching my profile: controller/mypage", error);
        throw error;
    }
});
exports.fetch_my_profile = fetch_my_profile;
/**
 * 내가 작성한 리뷰 상세 모달
 */
const fetch_mypage_review_detail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const review_id = req.params.reviewId;
    try {
        const data = yield mypage_service.mypage_review_detail(review_id);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error fetching mypage's review detail: controller/mypage", error);
        throw error;
    }
});
exports.fetch_mypage_review_detail = fetch_mypage_review_detail;
/**
 * 리뷰 삭제
 */
const delete_review = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const review_id = req.params.reviewId;
    try {
        const data = yield mypage_service.delete_review(req.user_id, review_id);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.DELETE_SUCCESS, data));
    }
    catch (error) {
        console.error("error deleting mypage's review: controller/mypage", error);
        throw error;
    }
});
exports.delete_review = delete_review;
/**
 * 개인정보 수정
 */
const update_profile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_update_dto = JSON.parse(req.body.update_data);
    if (req.file) {
        user_update_dto.profile_image = req.file.path;
        try {
            const data = yield mypage_service.update_profile(req.user_id, user_update_dto);
            return res
                .status(status_code_1.default.OK)
                .send(response_form_1.default.success(response_message_1.default.UPDATE_SUCCESS, data));
        }
        catch (error) {
            console.error("error updating profile: controller/mypage", error);
            throw error;
        }
    }
});
exports.update_profile = update_profile;
/**
 * 팔로워 목록 보기
 */
const fetch_follower = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield mypage_service_utils.get_follower(req.user_id);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error fetching follower: controller/mypage", error);
        throw error;
    }
});
exports.fetch_follower = fetch_follower;
/**
 * 팔로잉 목록 보기
 */
const fetch_following = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield mypage_service_utils.get_following(req.user_id);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error fetching following: controller/mypage", error);
        throw error;
    }
});
exports.fetch_following = fetch_following;
//# sourceMappingURL=mypage_controller.js.map