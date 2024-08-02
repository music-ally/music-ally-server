"use strict";
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
exports.get_user_bookmarked = exports.get_user_reviewed = exports.get_follower = exports.get_following = exports.is_follow = exports.find_musical_by_id = exports.find_review_by_id = exports.find_user_by_id = void 0;
const users_1 = __importDefault(require("../../schema/users"));
const follows_1 = __importDefault(require("../../schema/follows"));
const reviews_1 = __importDefault(require("../../schema/reviews"));
const musicals_1 = __importDefault(require("../../schema/musicals"));
const bookmarks_1 = __importDefault(require("../../schema/bookmarks"));
/**
 * 사용자의 object_id로
 * 스키마 반환
 */
const find_user_by_id = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findById(user_id);
        if (!user) {
            console.error("Error at service/mypage/service_utils");
            throw new Error("user not found");
        }
        return user;
    }
    catch (error) {
        console.error("Error finding user by Id: ServiceUtils", error);
        throw error;
    }
});
exports.find_user_by_id = find_user_by_id;
/**
 * 리뷰 object_id로
 * 스키마 반환
 */
const find_review_by_id = (review_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield reviews_1.default.findById(review_id);
        if (!review) {
            console.error("Error at service/mypage/service_utils");
            throw new Error("review not found");
        }
        return review;
    }
    catch (error) {
        console.error("Error finding review by Id: ServiceUtils", error);
        throw error;
    }
});
exports.find_review_by_id = find_review_by_id;
/**
 * 뮤지컬 object_id로
 * 스키마 반환
 */
const find_musical_by_id = (musical_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const musical = yield musicals_1.default.findById(musical_id);
        if (!musical) {
            console.error("Error at service/mypage/service_utils");
            throw new Error("musical not found");
        }
        return musical;
    }
    catch (error) {
        console.error("Error finding musical by Id: ServiceUtils", error);
        throw error;
    }
});
exports.find_musical_by_id = find_musical_by_id;
/**
 * 내가 상대를 팔로우하고 있는지 확인
 */
const is_follow = (user_id, opponent_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (user_id != opponent_id) {
            const data = yield follows_1.default.exists({
                from_user_id: user_id,
                to_user_id: opponent_id,
            });
            if (data) {
                return ("팔로잉");
            }
            else {
                return ("팔로우");
            }
        }
        else {
            return ("본인");
        }
    }
    catch (error) {
        console.error("Error finding do I follow someone: ServiceUtils", error);
        throw error;
    }
});
exports.is_follow = is_follow;
/**
 * 사용자의 object_id로
 * 내가 팔로우 하는 사람들(=팔로잉) 목록 반환
 */
const get_following = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const following_list = [];
        // 사용자가 팔로우하는 사람들의 리스트를 가져옴
        const follows = yield follows_1.default.find({ from_user_id: user_id });
        for (const follow of follows) {
            const followed_user = yield find_user_by_id(follow.to_user_id.toString());
            const followed_user_profile = followed_user.profile_image;
            following_list.push({
                user_id: follow.to_user_id,
                profile_image: followed_user_profile || "",
                nickname: followed_user.nickname,
                email: followed_user.email,
                is_following: "팔로잉",
            });
        }
        const data = {
            follow_list: following_list,
        };
        return data;
    }
    catch (error) {
        console.error("Error getting following: ServiceUtils", error);
        throw error;
    }
});
exports.get_following = get_following;
/**
 * 사용자의 object_id로
 * 나를 팔로우 하는 사람들(=팔로워) 반환
 */
const get_follower = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const follower_list = [];
        // 사용자를 팔로우하는 사람들의 리스트를 가져옴
        const follows = yield follows_1.default.find({ to_user_id: user_id });
        for (const follow of follows) {
            const follows_user = yield find_user_by_id(follow.from_user_id.toString());
            const follows_user_profile = follows_user.profile_image;
            // 내가 상대를 팔로우하고있는지 확인하는 작업
            const find_is_follow = yield is_follow(user_id, follow.from_user_id.toString());
            follower_list.push({
                user_id: follow.from_user_id,
                profile_image: follows_user_profile || "",
                nickname: follows_user.nickname,
                email: follows_user.email,
                is_following: find_is_follow,
            });
        }
        const data = {
            follow_list: follower_list,
        };
        return data;
    }
    catch (error) {
        console.error("Error getting follower: ServiceUtils", error);
        throw error;
    }
});
exports.get_follower = get_follower;
/**
 * 사용자가 리뷰 작성한 작품 반환
 */
const get_user_reviewed = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewed_list = [];
        const reviews = yield reviews_1.default.find({ user_id: user_id });
        for (const review of reviews) {
            const review_musical = yield musicals_1.default.findById(review.musical_id);
            reviewed_list.push({
                review_id: review._id,
                poster_image: (review_musical === null || review_musical === void 0 ? void 0 : review_musical.poster_image) || "",
            });
        }
        const data = {
            reviews: reviewed_list,
        };
        return data;
    }
    catch (error) {
        console.error("Error getting user reviewd musicals: ServiceUtils", error);
        throw error;
    }
});
exports.get_user_reviewed = get_user_reviewed;
/**
 * 사용자가 찜한 작품 반환
 */
const get_user_bookmarked = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookmarked_list = [];
        const bookmarks = yield bookmarks_1.default.find({ user_id: user_id });
        for (const bookmark of bookmarks) {
            const bookmark_musical = yield musicals_1.default.findById(bookmark.musical_id);
            if (bookmark_musical) {
                bookmarked_list.push({
                    musical_id: bookmark_musical._id,
                    poster_image: bookmark_musical.poster_image || "",
                });
            }
        }
        const data = {
            musicals: bookmarked_list,
        };
        return data;
    }
    catch (error) {
        console.error("Error getting user bookmarked musicals: ServiceUtils", error);
        throw error;
    }
});
exports.get_user_bookmarked = get_user_bookmarked;
//# sourceMappingURL=mypage_service_utils.js.map