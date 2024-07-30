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
exports.delete_notification = exports.get_follow_notifications = exports.get_review_notifications = exports.check_is_followed = exports.count_review_like = exports.get_review_like_users = void 0;
const users_1 = __importDefault(require("../../schema/users"));
const reviews_1 = __importDefault(require("../../schema/reviews"));
const notifications_1 = __importDefault(require("../../schema/notifications"));
const musicals_1 = __importDefault(require("../../schema/musicals"));
const review_likes_1 = __importDefault(require("../../schema/review_likes"));
const follows_1 = __importDefault(require("../../schema/follows"));
/**
 * 리뷰 좋아요 누른 유저 반환
 */
const get_review_like_users = (review_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const recent_likes = yield review_likes_1.default.find({
            review_id: review_id
        })
            .sort({ created_at: -1 })
            .limit(2);
        console.log(recent_likes);
        if (!Array.isArray(recent_likes) || (recent_likes === null || recent_likes === void 0 ? void 0 : recent_likes.length) == 0) {
            return { message: "No likes found for this review." };
        }
        const user_ids = recent_likes.map((like) => like.user_id);
        const users_with_profile_images = yield users_1.default.find({ _id: { $in: user_ids } }, { nickname: 1, profile_image: 1 });
        const most_recent_like = recent_likes[0]; //이걸 지우고 위에것에서 nickname 뽑아쓰고 싶은데 수정 아직 X
        const recent_user = yield users_1.default.findById(most_recent_like.user_id, {
            nickname: 1,
        });
        return {
            users_with_profile_images,
            recent_user,
        };
    }
    catch (error) {
        console.error("Error getting user who liked my review: Service Utils", error);
        throw error;
    }
});
exports.get_review_like_users = get_review_like_users;
/**
 * 리뷰 좋아요 개수 세기
 */
const count_review_like = (review_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review_likes = yield review_likes_1.default.find({ review_id: review_id });
        return review_likes.length;
    }
    catch (error) {
        console.error("Error counting review likes: Service Utils", error);
        throw error;
    }
});
exports.count_review_like = count_review_like;
/**
 * 내가 팔로우 하고 있는지 여부
 */
const check_is_followed = (user_id, follower_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield follows_1.default.findOne({
            from_user_id: user_id,
            to_user_id: follower_id,
        });
        if (data) {
            return true;
        }
        else {
            return false;
        }
    }
    catch (error) {
        console.error("Error checking if I'm following: Service Utils", error);
        throw error;
    }
});
exports.check_is_followed = check_is_followed;
/**
 * 리뷰 좋아요 알림 가져오기
 */
const get_review_notifications = (user_id, type) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        // user_id가 해당되는 알림들 모두 반환
        const notifications = yield notifications_1.default.find({
            user_id: user_id,
        }).sort({ create_at: -1 });
        // 사용자의 리뷰 알림 가져오기
        if (type === "리뷰") {
            const reviewLikeNotification = [];
            //const reviewIds: string[] = [];
            for (const notification of notifications) {
                if (notification.type === "리뷰") {
                    const review = yield reviews_1.default.findById(notification.review_id);
                    const reviewMusical = yield musicals_1.default.findById(review === null || review === void 0 ? void 0 : review.musical_id);
                    const reviewLikeUsers = yield get_review_like_users(review === null || review === void 0 ? void 0 : review._id);
                    const countReviewLike = yield count_review_like(review === null || review === void 0 ? void 0 : review._id);
                    console.log(reviewLikeUsers);
                    //reviewIds.push(review?._id);
                    reviewLikeNotification.push({
                        notification_id: notification._id,
                        type: notification.type,
                        create_at: notification.create_at,
                        review_id: notification.review_id,
                        poster_image: reviewMusical === null || reviewMusical === void 0 ? void 0 : reviewMusical.poster_image,
                        musical_name: reviewMusical === null || reviewMusical === void 0 ? void 0 : reviewMusical.musical_name,
                        review_like_nickname: (_a = reviewLikeUsers.recent_user) === null || _a === void 0 ? void 0 : _a.nickname,
                        review_like_image: (_b = reviewLikeUsers.users_with_profile_images) === null || _b === void 0 ? void 0 : _b.map((user) => user.profile_image),
                        review_like_num: countReviewLike - 1, //특정유저 외 n명이 좋아하고 있음이라 -1 함.
                    });
                }
            }
            return reviewLikeNotification;
        }
    }
    catch (error) {
        console.error("Error getting notifications by user id: ServiceUtils", error);
        throw error;
    }
});
exports.get_review_notifications = get_review_notifications;
/**
 * 팔로우 알림 가져오기
 */
const get_follow_notifications = (user_id, type) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        // user_id가 해당되는 알림들 모두 반환
        const notifications = yield notifications_1.default.find({
            user_id: user_id,
        }).sort({ create_at: -1 });
        // 사용자의 팔로워 알림 가져오기
        if (type === "팔로우") {
            const followNotification = [];
            for (const notification of notifications) {
                if (notification.type === "팔로우") {
                    const follower = yield users_1.default.findById(notification.follower_id);
                    const meFollow = yield check_is_followed(user_id, follower === null || follower === void 0 ? void 0 : follower._id);
                    followNotification.push({
                        notification_id: notification._id,
                        type: notification.type,
                        create_at: notification.create_at,
                        follower_id: notification.follower_id,
                        follower_image: (_c = follower === null || follower === void 0 ? void 0 : follower.profile_image) !== null && _c !== void 0 ? _c : "null", //살짝 애매함 null로 하고 타입을 any로 바꾸는게 나을지도
                        follower_nickname: follower === null || follower === void 0 ? void 0 : follower.nickname,
                        is_followed: meFollow,
                    });
                }
            }
            return followNotification;
        }
    }
    catch (error) {
        console.error("Error getting notifications by user id: ServiceUtils", error);
        throw error;
    }
});
exports.get_follow_notifications = get_follow_notifications;
/**
 * 알림 삭제
 */
const delete_notification = (notification_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield notifications_1.default.findByIdAndDelete(notification_id);
    }
    catch (error) {
        console.error("Error deleting notifications: ServiceUtils", error);
        throw error;
    }
});
exports.delete_notification = delete_notification;
//# sourceMappingURL=notification_service_utils.js.map