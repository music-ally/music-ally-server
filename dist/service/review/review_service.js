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
exports.writer_profile = exports.cancel_review_like = exports.review_like = exports.review_detail = exports.update_review = exports.write_review = exports.review_main = void 0;
const musicals_1 = __importDefault(require("../../schema/musicals"));
const actors_1 = __importDefault(require("../../schema/actors"));
const reviews_1 = __importDefault(require("../../schema/reviews"));
const notification_service = __importStar(require("../notification/notification_service"));
const review_likes_1 = __importDefault(require("../../schema/review_likes"));
const users_1 = __importDefault(require("../../schema/users"));
const theaters_1 = __importDefault(require("../../schema/theaters"));
const review_main = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const reviews = yield reviews_1.default.find()
            .populate({
            path: 'musical_id',
            model: musicals_1.default,
            select: 'poster_image'
        })
            .populate({
            path: 'user_id',
            model: users_1.default,
            select: 'profile_image nickname email',
        })
            //.sort({ create_at: -1 }) //-1 => 내림차순, 최신순 정렬
            .exec();
        let all_review = [];
        yield Promise.all(reviews.map((review) => __awaiter(void 0, void 0, void 0, function* () {
            const review_id = review._id;
            const is_like = yield review_likes_1.default.exists({ user_id, review_id });
            const like_num = yield review_likes_1.default.countDocuments({ review_id });
            const masked_email = `${review.user_id.email.slice(0, 2)}****`;
            const review_data = {
                review_id: review._id,
                poster_image: review.musical_id.poster_image,
                reviewer_profile_image: review.user_id.profile_image || null,
                reviewer_nickname: review.user_id.nickname,
                reviewer_email: masked_email,
                create_at: review.create_at,
                like_num: like_num,
                is_like: Boolean(is_like),
                fear: review.fear,
                sensitivity: review.sensitivity,
                violence: review.violence,
                content: review.content,
            };
            all_review.push(review_data);
        })));
        all_review = all_review.sort((a, b) => b.create_at - a.create_at); //sort 말고 더 좋은 방법 없는지 찾아보기
        let best_review = [...all_review];
        best_review = best_review
            .sort((a, b) => b.like_num - a.like_num) //b가 더 크면 b를 앞에다 놓음
            .slice(0, 10);
        const data = {
            best_review: best_review,
            all_review: all_review,
        };
        return data;
    }
    catch (error) {
        console.error("Error at get all_review: Service", error);
        throw error;
    }
});
exports.review_main = review_main;
const write_review = (user_id, review_write_dto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = new reviews_1.default({
            user_id: user_id,
            musical_id: review_write_dto.musical_id,
            actor_ids: review_write_dto.actor_ids,
            content: review_write_dto.content,
            watch_at: new Date(review_write_dto.watch_at),
            create_at: new Date(),
            fear: review_write_dto.fear,
            sensitivity: review_write_dto.sensitivity,
            violence: review_write_dto.violence,
        });
        yield review.save();
        const data = {
            _id: review._id,
        };
        return data;
    }
    catch (error) {
        console.error("Error at write_review: Service", error);
        throw error;
    }
});
exports.write_review = write_review;
const update_review = (review_id, review_update_dto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield reviews_1.default.findByIdAndUpdate(review_id, review_update_dto, { new: true });
        return data;
    }
    catch (error) {
        console.error("Error at update_review: Service", error);
        throw error;
    }
});
exports.update_review = update_review;
const review_detail = (review_id, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review = yield reviews_1.default.findById(review_id)
            .populate({
            path: 'user_id',
            model: users_1.default,
            select: 'profile_image nickname email'
        })
            .populate({
            path: 'musical_id',
            model: musicals_1.default,
            populate: {
                path: 'theater_id',
                model: theaters_1.default,
                select: 'theater_name'
            },
            select: 'poster_uri musical_name'
        })
            .populate({
            path: 'actor_ids',
            model: actors_1.default,
            select: 'profile_image actor_name'
        })
            .exec(); // 이렇게 any로 캐스팅해줘야 오류가 안 나는데 왜 필요한지 모르겠음...
        if (!review) {
            throw new Error('Review not found');
        }
        console.log(review);
        const is_like = yield review_likes_1.default.exists({ user_id, review_id });
        const masked_email = `${review.user_id.email.slice(0, 2)}****`;
        const like_num = yield review_likes_1.default.countDocuments({ review_id: review_id });
        const data = {
            review_id: review._id,
            musical: {
                musical_id: review.musical_id._id,
                poster_uri: review.musical_id.poster_uri,
                musical_name: review.musical_id.musical_name,
                theater_name: review.musical_id.theater_id.theater_name,
                watch_at: review.watch_at,
            },
            actors: review.actor_ids.map((actor) => ({
                actor_id: actor._id,
                profile_image: actor.profile_image,
                actor_name: actor.actor_name,
            })),
            poster_uri: review.musical_id.poster_uri,
            reviewer_profile_image: review.user_id.profile_image || null,
            reviewer_nickname: review.user_id.nickname,
            reviewer_email: masked_email,
            like_num: like_num,
            is_like: Boolean(is_like),
            violence: review.violence,
            fear: review.fear,
            sensitivity: review.sensitivity,
            content: review.content,
            create_at: review.create_at
        };
        return data;
    }
    catch (error) {
        console.error("Error at get review_detail: Service", error);
        throw error;
    }
});
exports.review_detail = review_detail;
const review_like = (user_id, review_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review_like = new review_likes_1.default({
            user_id: user_id,
            review_id: review_id
        });
        yield review_like.save();
        yield notification_service.make_review_notification("리뷰", review_id, user_id);
        return;
    }
    catch (error) {
        console.error("Error at review_like: Service", error);
        throw error;
    }
});
exports.review_like = review_like;
const cancel_review_like = (user_id, review_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const review_like = yield review_likes_1.default.findOneAndDelete({
            user_id: user_id,
            review_id: review_id
        });
        return;
    }
    catch (error) {
        console.error("Error at cancel_review_like: Service", error);
        throw error;
    }
});
exports.cancel_review_like = cancel_review_like;
const writer_profile = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findById(user_id);
        console.log(user);
        if (!user) {
            throw new Error("유저가 존재하지 않습니다.");
        }
        const masked_email = `${user.email.slice(0, 2)}****`;
        const data = {
            reviewer_profile_image: user.profile_image || null,
            reviewer_nickname: user.nickname,
            reviewer_email: masked_email
        };
        return data;
    }
    catch (error) {
        console.error("Error at get writer profile: Service", error);
        throw error;
    }
});
exports.writer_profile = writer_profile;
//# sourceMappingURL=review_service.js.map