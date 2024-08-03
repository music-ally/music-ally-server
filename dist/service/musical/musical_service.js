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
exports.cancel_bookmark = exports.bookmark = exports.near_musical = exports.ongoing_musical = exports.most_bookmark_musical = exports.most_review_musical = exports.musical_my_sex_bookmark = exports.musical_my_sex_review = exports.musical_my_age_bookmark = exports.musical_my_age_review = exports.random_follow_musical = exports.random_actor_musical = exports.top_rank_musical = exports.musical_detail = exports.all_musical = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const musicals_1 = __importDefault(require("../../schema/musicals"));
const reviews_1 = __importDefault(require("../../schema/reviews"));
const bookmarks_1 = __importDefault(require("../../schema/bookmarks"));
const users_1 = __importDefault(require("../../schema/users"));
const musical_service_utils_1 = require("./musical_service_utils");
const theaters_1 = __importDefault(require("../../schema/theaters"));
const actors_1 = __importDefault(require("../../schema/actors"));
const castings_1 = __importDefault(require("../../schema/castings"));
const follows_1 = __importDefault(require("../../schema/follows"));
const review_likes_1 = __importDefault(require("../../schema/review_likes"));
const musical_detail = (user_id, musical_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user_oid = new mongoose_1.default.Types.ObjectId(user_id);
        const musical_oid = new mongoose_1.default.Types.ObjectId(musical_id);
        const musical = yield musicals_1.default.findById(musical_oid);
        if (!musical) {
            throw new Error("해당 뮤지컬 아이디의 뮤지컬을 찾을 수 없습니다");
        }
        //뮤지컬 조회수 증가
        musical.view++;
        yield musical.save();
        const is_bookmark = Boolean(yield bookmarks_1.default.exists({ user_oid, musical_oid }));
        const theater = yield theaters_1.default.findById(musical.theater_id);
        if (!theater) {
            throw new Error("해당 극장 아이디의 극장을 찾을 수 없습니다");
        }
        console.log(musical_oid);
        const castings = yield castings_1.default.find({ musical_id: musical_oid })
            .populate('actor_id')
            .exec();
        console.log(castings);
        const castings_names = castings.map((casting) => casting.actor_id.actor_name);
        console.log(castings_names);
        const review_data = yield reviews_1.default.find({ musical_id: musical_oid })
            .populate('user_id')
            .populate('musical_id')
            .exec();
        const reviews = yield Promise.all(review_data.map((review) => __awaiter(void 0, void 0, void 0, function* () {
            const review_id = review._id;
            const is_like = Boolean(yield review_likes_1.default.exists({ user_id, review_id }));
            const like_num = yield review_likes_1.default.countDocuments({ review_id });
            const masked_email = `${review.user_id.email.slice(0, 2)}****`;
            return {
                review_id: review._id,
                reviewer_profile_image: review.user_id.profile_image || null,
                reviewer_nickname: review.user_id.nickname,
                reviewer_email: masked_email,
                create_at: review.create_at,
                like_num: like_num,
                is_like: is_like,
                fear: review.fear,
                sensitivity: review.sensitivity,
                violence: review.violence,
                content: review.content,
            };
        })));
        const data = {
            musical_id: musical_oid,
            poster_image: musical.poster_image,
            musical_name: musical.musical_name,
            is_bookmark: is_bookmark,
            musical_subname: musical.musical_subname,
            musical_genre: musical.musical_genre,
            age_limit: musical.age_limit,
            runtime: musical.runtime,
            website: musical.website,
            castings: castings_names,
            start_at: musical.start_at,
            end_at: musical.end_at,
            theater_name: theater.theater_name,
            theater_address: theater.theater_road_address ? theater.theater_road_address : theater.theater_address,
            reviews: reviews
        };
        return data;
    }
    catch (error) {
        console.error("Error at get musical_detail: Service", error);
        throw error;
    }
});
exports.musical_detail = musical_detail;
const top_rank_musical = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter_data = yield musicals_1.default.aggregate([
            {
                $sort: { view: -1 } //-1 : 내림차순
            },
            {
                $limit: 10
            },
            {
                $project: {
                    _id: 0, // 0 => 제외한다
                    musical_id: "$_id",
                    poster_image: "$poster_image"
                }
            }
        ]);
        return filter_data;
    }
    catch (error) {
        console.error("Error at get top rank musical: Service", error);
        throw error;
    }
});
exports.top_rank_musical = top_rank_musical;
const random_actor_musical = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const random_actor = yield castings_1.default.aggregate([
            {
                $group: {
                    _id: "$actor_id",
                    count: { $sum: 1 },
                    musicals: { $addToSet: "$musical_id" }
                }
            },
            {
                $match: {
                    count: { $gte: 4 }
                }
            },
            {
                $sample: { size: 1 }
            }
        ]);
        const actor = yield actors_1.default.findById(random_actor[0]._id);
        if (!actor) {
            throw new Error("선택 배우 정보 불러오기 실패");
        }
        const musicals = yield musicals_1.default.find({
            _id: { $in: random_actor[0].musicals }
        });
        const musical_dto = musicals.map(musical => ({
            musical_id: musical._id,
            poster_image: musical.poster_image,
        }));
        const data = {
            actor_name: actor === null || actor === void 0 ? void 0 : actor.actor_name,
            musicals: musical_dto
        };
        return data;
    }
    catch (error) {
        console.error("Error at get all musical: Service", error);
        throw error;
    }
});
exports.random_actor_musical = random_actor_musical;
const random_follow_musical = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const random_follow = yield follows_1.default.aggregate([
            {
                $match: {
                    from_user_id: new mongoose_1.default.Types.ObjectId(user_id)
                }
            },
            {
                $lookup: {
                    from: "reviews",
                    localField: "to_user_id",
                    foreignField: "user_id",
                    as: "reviews"
                }
            },
            {
                $addFields: {
                    review_count: { $size: "$reviews" }
                }
            },
            {
                $match: {
                    review_count: { $gte: 4 }
                }
            },
            {
                $sample: { size: 1 }
            },
            {
                $project: {
                    to_user_id: 1,
                    review_musical_ids: "$reviews.musical_id"
                }
            },
        ]);
        if (random_follow.length === 0) {
            throw new Error("리뷰가 4개 이상인 팔로우한 유저 없음");
        }
        console.log(random_follow);
        const to_user_id = random_follow[0].to_user_id;
        const to_user = yield users_1.default.findById(to_user_id);
        if (!to_user) {
            throw new Error("팔로우한 유저 찾을 수 없음");
        }
        const musicals = yield musicals_1.default.aggregate([
            {
                $match: {
                    _id: { $in: random_follow[0].review_musical_ids }
                },
            },
            {
                $project: {
                    musical_id: "$_id",
                    poster_image: 1
                }
            }
        ]);
        const musical_dto = musicals.map(musical => ({
            musical_id: musical._id,
            poster_image: musical.poster_image,
        }));
        const data = {
            follow_name: to_user.nickname,
            musicals: musical_dto
        };
        return data;
    }
    catch (error) {
        console.error("Error at get follow's reviewed musical: Service", error);
        throw error;
    }
});
exports.random_follow_musical = random_follow_musical;
const all_musical = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const musicals = yield musicals_1.default.find()
            .populate({
            path: 'theater_id',
            model: theaters_1.default,
            select: 'theater_name'
        }).exec(); //exec()의 필요성,, promise 반환? 인데 잘 모르겠음
        const musical_dto = musicals.map(musical => ({
            musical_id: musical._id,
            poster_image: musical.poster_image,
            musical_name: musical.musical_name,
            start_at: musical.start_at,
            end_at: musical.end_at,
            theater_name: musical.theater_id.theater_name
        }));
        const data = {
            musicals: musical_dto
        };
        return data;
    }
    catch (error) {
        console.error("Error at get all musical: Service", error);
        throw error;
    }
});
exports.all_musical = all_musical;
const musical_my_age_review = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findById(user_id);
        if (!user) {
            throw new Error('존재하지 않는 유저');
        }
        const birthday = user.birthday;
        const age_group = (0, musical_service_utils_1.calculate_age)(birthday);
        const today_year = new Date().getFullYear();
        const age_lower_bound = new Date(today_year - age_group - 9, 0, 1); //js의 월은 0~11
        const age_upper_bound = new Date(today_year - age_group, 11, 31);
        const filter_data = yield users_1.default.aggregate([
            {
                $match: {
                    birthday: {
                        $gte: age_lower_bound, //이상
                        $lte: age_upper_bound //이하
                    }
                }
            },
            {
                $lookup: {
                    from: 'reviews',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'reviews'
                }
            },
            {
                $unwind: '$reviews'
            },
            {
                $lookup: {
                    from: 'musicals',
                    localField: 'reviews.musical_id',
                    foreignField: '_id',
                    as: 'musical'
                }
            },
            {
                $unwind: '$musical'
            },
            {
                $group: {
                    _id: '$musical._id',
                    poster_image: { $first: '$musical.poster_image' }
                }
            },
            {
                $project: {
                    musical_id: '$_id',
                    poster_image: '$poster_image'
                }
            }
        ]);
        const musicals = filter_data.map(musical => ({
            musical_id: musical.musical_id,
            poster_image: musical.poster_image
        }));
        const data = {
            age_group: `${age_group}대`,
            musicals: musicals
        };
        return data;
    }
    catch (error) {
        console.error("Error at musical_my_age_review: Service", error);
        throw error;
    }
});
exports.musical_my_age_review = musical_my_age_review;
const musical_my_age_bookmark = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findById(user_id);
        if (!user) {
            throw new Error('존재하지 않는 유저');
        }
        const birthday = user.birthday;
        const age_group = (0, musical_service_utils_1.calculate_age)(birthday);
        const today_year = new Date().getFullYear();
        const age_lower_bound = new Date(today_year - age_group - 9, 0, 1); //js의 월은 0~11
        const age_upper_bound = new Date(today_year - age_group, 11, 31);
        const filter_data = yield users_1.default.aggregate([
            {
                $match: {
                    birthday: {
                        $gte: age_lower_bound, //이상
                        $lte: age_upper_bound //이하
                    }
                }
            },
            {
                $lookup: {
                    from: 'bookmarks',
                    localField: '_id',
                    foreignField: 'user_id',
                    as: 'bookmarks'
                }
            },
            {
                $unwind: '$bookmarks'
            },
            {
                $lookup: {
                    from: 'musicals',
                    localField: 'bookmarks.musical_id',
                    foreignField: '_id',
                    as: 'musical'
                }
            },
            {
                $unwind: '$musical'
            },
            {
                $group: {
                    _id: '$musical._id',
                    poster_image: { $first: '$musical.poster_image' }
                }
            },
            {
                $project: {
                    musical_id: '$_id',
                    poster_image: '$poster_image'
                }
            }
        ]);
        const musicals = filter_data.map(musical => ({
            musical_id: musical.musical_id,
            poster_image: musical.poster_image
        }));
        const data = {
            age_group: `${age_group}대`,
            musicals: musicals
        };
        return data;
    }
    catch (error) {
        console.error("Error at musical_my_age_bookmark: Service", error);
        throw error;
    }
});
exports.musical_my_age_bookmark = musical_my_age_bookmark;
const musical_my_sex_review = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findById(user_id);
        if (!user) {
            throw new Error('존재하지 않는 유저');
        }
        const sex = user.sex;
        const filter_data = yield reviews_1.default.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $match: {
                    "user.sex": sex
                }
            },
            {
                $group: {
                    _id: "$musical_id",
                    review_count: { $count: {} },
                    poster_image: { $first: "$musical.poster_image" }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "musicals",
                    localField: "_id",
                    foreignField: "_id",
                    as: "musical"
                }
            },
            {
                $unwind: "$musical"
            },
            {
                $project: {
                    musical_id: "$_id",
                    poster_image: "$musical.poster_image"
                }
            }
        ]);
        const musicals = filter_data.map(musical => ({
            musical_id: musical.musical_id,
            poster_image: musical.poster_image
        }));
        const data = {
            sex: sex ? "여성" : "남성",
            musicals: musicals
        };
        return data;
    }
    catch (error) {
        console.error("Error at musical_my_sex_review: Service", error);
        throw error;
    }
});
exports.musical_my_sex_review = musical_my_sex_review;
const musical_my_sex_bookmark = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findById(user_id);
        if (!user) {
            throw new Error('존재하지 않는 유저');
        }
        const sex = user.sex;
        const filter_data = yield bookmarks_1.default.aggregate([
            {
                $lookup: {
                    from: "users",
                    localField: "user_id",
                    foreignField: "_id",
                    as: "user"
                }
            },
            {
                $unwind: "$user"
            },
            {
                $match: {
                    "user.sex": sex
                }
            },
            {
                $group: {
                    _id: "$musical_id",
                    bookmark_count: { $count: {} },
                    poster_image: { $first: "$musical.poster_image" }
                }
            },
            {
                $sort: { count: -1 }
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "musicals",
                    localField: "_id",
                    foreignField: "_id",
                    as: "musical"
                }
            },
            {
                $unwind: "$musical"
            },
            {
                $project: {
                    musical_id: "$_id",
                    poster_image: "$musical.poster_image"
                }
            }
        ]);
        const musicals = filter_data.map(musical => ({
            musical_id: musical.musical_id,
            poster_image: musical.poster_image
        }));
        const data = {
            sex: sex ? "여성" : "남성",
            musicals: musicals
        };
        return data;
    }
    catch (error) {
        console.error("Error at musical_my_sex_bookmark: Service", error);
        throw error;
    }
});
exports.musical_my_sex_bookmark = musical_my_sex_bookmark;
const most_review_musical = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter_data = yield reviews_1.default.aggregate([
            {
                $group: {
                    _id: "$musical_id",
                    review_count: { $count: {} }
                }
            },
            {
                $sort: { review_count: -1 } //-1 : 내림차순
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "musicals",
                    localField: "_id",
                    foreignField: "_id",
                    as: "musical"
                }
            },
            {
                $unwind: "$musical"
            },
            {
                $project: {
                    _id: 0, // 0 => 제외한다
                    musical_id: "$_id",
                    poster_image: "$musical.poster_image"
                }
            }
        ]);
        return filter_data;
    }
    catch (error) {
        console.error("Error at most_review_musical: Service", error);
        throw error;
    }
});
exports.most_review_musical = most_review_musical;
const most_bookmark_musical = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter_data = yield bookmarks_1.default.aggregate([
            {
                $group: {
                    _id: "$musical_id",
                    bookmark_count: { $count: {} }
                }
            },
            {
                $sort: { bookmark_count: -1 }
            },
            {
                $limit: 10
            },
            {
                $lookup: {
                    from: "musicals",
                    localField: "_id",
                    foreignField: "_id",
                    as: "musical"
                }
            },
            {
                $unwind: "$musical"
            },
            {
                $project: {
                    _id: 0, // 0 => 제외한다
                    musical_id: "$_id",
                    poster_image: "$musical.poster_image"
                }
            }
        ]);
        return filter_data;
    }
    catch (error) {
        console.error("Error at most_bookmark_musical: Service", error);
        throw error;
    }
});
exports.most_bookmark_musical = most_bookmark_musical;
const ongoing_musical = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const filter_data = yield musicals_1.default.aggregate([
            {
                $addFields: {
                    trimmed_start_at: { $trim: { input: "$start_at" } },
                    trimmed_end_at: { $trim: { input: "$end_at" } }
                }
            },
            {
                $match: {
                    $expr: {
                        $and: [
                            { $lte: [{ $dateFromString: { dateString: "$trimmed_start_at", format: "%Y/%m/%d" } }, today] },
                            { $gte: [{ $dateFromString: { dateString: "$trimmed_end_at", format: "%Y/%m/%d" } }, today] }
                        ]
                    }
                }
            },
            {
                $limit: 10
            },
            {
                $project: {
                    _id: 0, // 0 => 제외한다
                    musical_id: "$_id",
                    poster_image: "$poster_image"
                }
            }
        ]);
        return filter_data;
    }
    catch (error) {
        console.error("Error at ongoing_musical: Service", error);
        throw error;
    }
});
exports.ongoing_musical = ongoing_musical;
const near_musical = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const today = new Date();
        const user = yield users_1.default.findById(user_id).populate('homearea').exec();
        const user_area = user.homearea.area_name.toString();
        const musicals = yield musicals_1.default.aggregate([
            {
                $lookup: {
                    from: 'theaters',
                    localField: 'theater_id',
                    foreignField: '_id',
                    as: 'theaters'
                }
            },
            {
                $unwind: '$theaters'
            },
            {
                $addFields: {
                    trimmed_start_at: { $trim: { input: "$start_at" } },
                    trimmed_end_at: { $trim: { input: "$end_at" } }
                }
            },
            {
                $match: {
                    $expr: {
                        $and: [
                            { $lte: [{ $dateFromString: { dateString: "$trimmed_start_at", format: "%Y/%m/%d" } }, today] },
                            { $gte: [{ $dateFromString: { dateString: "$trimmed_end_at", format: "%Y/%m/%d" } }, today] },
                            { $eq: ["$theaters.area_id", user.homearea._id] }
                        ]
                    }
                }
            },
            {
                $limit: 10
            },
            {
                $project: {
                    _id: 0,
                    musical_id: "$_id",
                    poster_image: "$poster_image",
                }
            }
        ]);
        const data = {
            area: user_area,
            musicals: musicals
        };
        return data;
    }
    catch (error) {
        console.error("Error at near_musical: Service", error);
        throw error;
    }
});
exports.near_musical = near_musical;
const bookmark = (user_id, musical_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookmark = new bookmarks_1.default({
            user_id: user_id,
            musical_id: musical_id
        });
        yield bookmark.save();
        return;
    }
    catch (error) {
        console.error("Error at bookmark: Service", error);
        throw error;
    }
});
exports.bookmark = bookmark;
const cancel_bookmark = (user_id, musical_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const bookmark = yield bookmarks_1.default.findOneAndDelete({
            user_id: user_id,
            musical_id: musical_id
        });
        return;
    }
    catch (error) {
        console.error("Error at cancel_bookmark : Service", error);
        throw error;
    }
});
exports.cancel_bookmark = cancel_bookmark;
//# sourceMappingURL=musical_service.js.map