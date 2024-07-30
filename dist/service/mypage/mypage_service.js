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
exports.update_profile = exports.delete_review = exports.mypage_review_detail = exports.get_my_profile = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const mypage_service_utils = __importStar(require("./mypage_service_utils"));
const users_1 = __importDefault(require("../../schema/users"));
const reviews_1 = __importDefault(require("../../schema/reviews"));
const review_likes_1 = __importDefault(require("../../schema/review_likes"));
const user_service_1 = require("../user/user_service");
/**
 * 내 프로필 반환
 */
const get_my_profile = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield mypage_service_utils.find_user_by_id(user_id);
        // 팔로잉수 반환값
        const following = yield mypage_service_utils.get_following(user_id);
        const count_following = following.follow_list.length;
        // 팔로워수 반환값
        const follower = yield mypage_service_utils.get_follower(user_id);
        const count_follower = follower.follow_list.length;
        // 리뷰 작성한 작품 반환
        const review_list = yield mypage_service_utils.get_user_reviewed(user_id);
        const count_review = review_list.reviews.length;
        // 북마크한 작품 반환
        const bookmark_list = yield mypage_service_utils.get_user_bookmarked(user_id);
        const count_bookmark = bookmark_list.musicals.length;
        const data = {
            profile_image: user.profile_image,
            nickname: user.nickname,
            email: user.email,
            following_num: count_following,
            follower_num: count_follower,
            review_num: count_review,
            bookmark_num: count_bookmark,
            reviews: review_list,
            bookmarks: bookmark_list,
        };
        return data;
    }
    catch (error) {
        console.error("Error getting profile at mypage: Service", error);
        throw error;
    }
});
exports.get_my_profile = get_my_profile;
/**
 * 내가 작성한 리뷰 상세 모달 반환
 */
const mypage_review_detail = (review_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield mypage_service_utils.find_review_by_id(review_id);
        const review_musical = yield mypage_service_utils.find_musical_by_id(review.musical_id.toString());
        const data = {
            review_id: review._id,
            poster_image: review_musical.poster_image,
            musical_name: review_musical.musical_name,
            fear: review.fear,
            sensitivity: review.sensitivity,
            violence: review.violence,
            content: review.content,
        };
        return data;
    }
    catch (error) {
        console.error("Error getting detail review at mypage: Service", error);
        throw error;
    }
});
exports.mypage_review_detail = mypage_review_detail;
/**
 * 리뷰 삭제
 */
const delete_review = (user_id, review_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield mypage_service_utils.find_user_by_id(user_id);
        const review_user = yield reviews_1.default.findOne({ user_id: user._id });
        if (review_user) {
            yield reviews_1.default.findByIdAndDelete({ _id: review_id });
            yield review_likes_1.default.deleteMany({ review_id: review_id });
        }
        else {
            throw new Error("User does not match with this review");
        }
    }
    catch (error) {
        console.error("Error delete review at mypage: Service", error);
        throw error;
    }
});
exports.delete_review = delete_review;
/**
 * 개인정보 수정
 */
const update_profile = (user_id, user_update_dto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield mypage_service_utils.find_user_by_id(user_id);
        if (user_update_dto.password) {
            const hashed_password = yield bcryptjs_1.default.hash(user_update_dto.password, 10);
            user_update_dto.password = hashed_password;
        }
        if (user_update_dto.homearea_name) {
            const updated_homearea = yield (0, user_service_1.find_homearea_by_name)(user_update_dto.homearea_name);
            user_update_dto.homearea = updated_homearea;
        }
        const updated_user = yield users_1.default.findByIdAndUpdate(user._id, user_update_dto, { new: true });
        const data = {
            nickname: updated_user === null || updated_user === void 0 ? void 0 : updated_user.nickname,
            birthday: updated_user === null || updated_user === void 0 ? void 0 : updated_user.birthday,
            homearea_name: user_update_dto.homearea_name,
            profile_image: updated_user === null || updated_user === void 0 ? void 0 : updated_user.profile_image
        };
        return data;
    }
    catch (error) {
        console.error("Error updating profile at mypage: Service", error);
        throw error;
    }
});
exports.update_profile = update_profile;
//# sourceMappingURL=mypage_service.js.map