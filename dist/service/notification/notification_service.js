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
exports.on_off_notification = exports.get_notification = exports.make_follow_notification = exports.make_review_notification = void 0;
const notifications_1 = __importDefault(require("../../schema/notifications"));
const notification_service_utils = __importStar(require("./notification_service_utils"));
const reviews_1 = __importDefault(require("../../schema/reviews"));
const users_1 = __importDefault(require("../../schema/users"));
/**
 * 알림 생성
 * : 리뷰 좋아요 받았을때
 */
const make_review_notification = (type, review_id, from_user_id // 리뷰 좋아요 누른 사람
) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 중복 알림 존재하는지 확인
        const exist = yield notifications_1.default.find({
            review_like_user_id: from_user_id,
            review_id: review_id,
        });
        console.log(exist);
        // 리뷰 알림 생성
        if (type === "리뷰" && exist.length === 0) {
            const to_user_id = yield reviews_1.default.findById(review_id).select("user_id");
            const reviewNotification = new notifications_1.default({
                user_id: to_user_id === null || to_user_id === void 0 ? void 0 : to_user_id.user_id,
                type: "리뷰",
                create_at: new Date(),
                review_id: review_id,
                review_like_user_id: from_user_id,
            });
            yield reviewNotification.save();
        }
        else {
            console.log("이미 알림이 존재합니다.");
        }
    }
    catch (error) {
        console.error("Error making notifications: Service", error);
        throw error;
    }
});
exports.make_review_notification = make_review_notification;
/**
 * 알림 생성
 * : 팔로우 받았을때
 */
const make_follow_notification = (type, to_user_id, // 팔로우 받은 사람
from_user_id // 팔로우 누른 사람
) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // 중복 알림 존재하는지 확인
        const exist = yield notifications_1.default.findOne({
            user_id: to_user_id,
            follower_id: from_user_id,
        });
        // 팔로우 알림 생성
        if (exist) {
            console.log("이미 알림이 존재합니다.");
        }
        else {
            const followNotification = new notifications_1.default({
                user_id: to_user_id,
                type: "팔로우",
                create_at: new Date(),
                follower_id: from_user_id,
            });
            yield followNotification.save();
            console.log(`${from_user_id}가 ${to_user_id}를 팔로우함`);
        }
    }
    catch (error) {
        console.error("Error making notifications: Service", error);
        throw error;
    }
});
exports.make_follow_notification = make_follow_notification;
/**
 * 알림 전체 반환
 * : 동일한 리뷰 id를 가진 좋아요 알림은 하나로 통합
 * : 팔로우 알림은 하나씩 반환
 */
const get_notification = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviewLikeNotifications = (yield notification_service_utils.get_review_notifications(user_id, "리뷰")) || [];
        const followNotifications = (yield notification_service_utils.get_follow_notifications(user_id, "팔로우")) || [];
        const notifications = [
            ...reviewLikeNotifications,
            ...followNotifications,
        ];
        return { notifications };
    }
    catch (error) {
        console.error("Error getting notifications: Service", error);
        throw error;
    }
});
exports.get_notification = get_notification;
/**
 * 알림 껐다 키기
 */
const on_off_notification = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findById(user_id);
        if (user) {
            user.noti_allow = !user.noti_allow;
            yield user.save();
        }
    }
    catch (error) {
        console.error("Error turn on/off notifications: Service", error);
        throw error;
    }
});
exports.on_off_notification = on_off_notification;
//# sourceMappingURL=notification_service.js.map