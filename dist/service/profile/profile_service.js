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
exports.get_others_following = exports.get_others_follower = exports.cancel_follow = exports.do_follow = exports.get_user_profile = void 0;
const follows_1 = __importDefault(require("../../schema/follows"));
const notification_service = __importStar(require("../notification/notification_service"));
const mypage_service_utils = __importStar(require("../mypage/mypage_service_utils"));
const profile_service_utils = __importStar(require("./profile_service_utils"));
/**
 * 특정 유저 프로필 반환
 */
const get_user_profile = (user_id, to_user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield mypage_service_utils.find_user_by_id(to_user_id);
        // 팔로잉수 반환값
        const following = yield mypage_service_utils.get_following(to_user_id);
        const count_following = following.follow_list.length;
        // 팔로워수 반환값
        const follower = yield mypage_service_utils.get_follower(to_user_id);
        const count_follower = follower.follow_list.length;
        // 리뷰 작성한 작품 반환
        const review_list = yield mypage_service_utils.get_user_reviewed(to_user_id);
        const count_review = review_list.reviews.length;
        // 북마크한 작품 반환
        const bookmark_list = yield mypage_service_utils.get_user_bookmarked(to_user_id);
        const count_bookmark = bookmark_list.musicals.length;
        // 팔로우 여부 확인
        const is_following = yield profile_service_utils.check_follow(user_id, to_user_id);
        const data = {
            profile_image: user.profile_image,
            nickname: user.nickname,
            email: user.email,
            following_num: count_following,
            follower_num: count_follower,
            review_num: count_review,
            bookmark_num: count_bookmark,
            is_following: is_following,
            reviews: review_list,
            bookmarks: bookmark_list,
        };
        return data;
    }
    catch (error) {
        console.error("Error getting user's profile: Service", error);
        throw error;
    }
});
exports.get_user_profile = get_user_profile;
/**
 * 팔로우 하기
 * 접속중인 유저가 누군가를 follow할때를 가정한 서비스
 * (그래서 user_id는 항상 로그인 중인 주체를 의미함)
 * 순서 : 하는 사람, 당하는 사람
 */
const do_follow = (user_id, to_user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const follow = new follows_1.default({
            from_user_id: user_id,
            to_user_id: to_user_id,
        });
        yield follow.save();
        yield notification_service.make_follow_notification("팔로우", to_user_id, user_id);
    }
    catch (error) {
        console.error("Error following someone: Service", error);
        throw error;
    }
});
exports.do_follow = do_follow;
/**
 * 팔로우 취소 하기
 * 접속중인 유저가 누군가를 follow 취소할때를 가정한 서비스
 * (그래서 user_id는 항상 로그인 중인 주체를 의미함)
 * 순서 : 하는 사람, 취소 당하는 사람
 */
const cancel_follow = (user_id, to_user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const follow_id = yield follows_1.default.findOne({
            from_user_id: user_id,
            to_user_id: to_user_id,
        }).select("_id");
        yield follows_1.default.findByIdAndDelete(follow_id);
    }
    catch (error) {
        console.error("Error cancel following someone: Service", error);
        throw error;
    }
});
exports.cancel_follow = cancel_follow;
/**
 * 특정 유저의 팔로워 목록 반환
 * user_id : 내 id
 * opponent_id : 특정 유저의 id
 */
const get_others_follower = (user_id, opponent_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const follower_list = [];
        // 특정 유저를 팔로우하는 사람들의 리스트를 가져옴
        const follows = yield follows_1.default.find({ to_user_id: opponent_id });
        for (const follow of follows) {
            const follows_user = yield mypage_service_utils.find_user_by_id(follow.from_user_id.toString());
            // 내가 그 리스트 사람들을 팔로우하고 있는지 확인하는 작업
            const find_is_follow = yield mypage_service_utils.is_follow(user_id, follows_user._id.toString());
            follower_list.push({
                user_id: follows_user._id,
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
        console.error("Error getting someone's follower: ServiceUtils", error);
        throw error;
    }
});
exports.get_others_follower = get_others_follower;
/**
 * 특정 유저의 팔로잉 목록 반환
 * user_id : 내 id
 * opponent_id : 특정 유저의 id
 */
const get_others_following = (user_id, opponent_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const following_list = [];
        // 특정 유저가 팔로우하는 사람들의 리스트를 가져옴
        const follows = yield follows_1.default.find({ from_user_id: opponent_id });
        for (const follow of follows) {
            const followed_user = yield mypage_service_utils.find_user_by_id(follow.to_user_id.toString());
            // 내가 상대를 팔로우하고있는지 확인하는 작업
            const find_is_follow = yield mypage_service_utils.is_follow(user_id, followed_user._id.toString());
            following_list.push({
                user_id: followed_user._id,
                nickname: followed_user.nickname,
                email: followed_user.email,
                is_following: find_is_follow,
            });
        }
        const data = {
            follow_list: following_list,
        };
        return data;
    }
    catch (error) {
        console.error("Error getting someone's following: ServiceUtils", error);
        throw error;
    }
});
exports.get_others_following = get_others_following;
//# sourceMappingURL=profile_service.js.map