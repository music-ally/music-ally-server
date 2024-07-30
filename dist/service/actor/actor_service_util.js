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
exports.find_age_by_userId = exports.get_actor_details = exports.get_musical_details = exports.get_random_singer = exports.get_random_musical = exports.get_actors_same_musical = exports.get_actor_item_by_Id = exports.get_actors_in_musical = exports.find_actor_by_id = exports.find_musical_by_Id = exports.find_actor_by_playdb_id = exports.find_musical_by_playdb_id = void 0;
const actors_1 = __importDefault(require("../../schema/actors"));
const musicals_1 = __importDefault(require("../../schema/musicals"));
const castings_1 = __importDefault(require("../../schema/castings"));
const users_1 = __importDefault(require("../../schema/users"));
/**
 * 뮤지컬의 playdb_id가
 * 유효한지 확인해주고
 * 스키마 반환
 */
const find_musical_by_playdb_id = (musical_playdb_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const musical = yield musicals_1.default.findOne({
            musical_playdb_id: musical_playdb_id,
        }).select("_id");
        if (!musical) {
            console.error("Error at service/actor/service_utils");
            throw new Error("musical not found");
        }
        return musical;
    }
    catch (error) {
        console.error("Error finding musical by playdb Id: ServiceUtils", error);
        throw error;
    }
});
exports.find_musical_by_playdb_id = find_musical_by_playdb_id;
/**
 * 배우의 playdb_id가
 * 유효한지 확인해주고
 * 스키마 반환
 */
const find_actor_by_playdb_id = (actor_playdb_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actor = yield actors_1.default.findOne({
            actor_playdb_id: actor_playdb_id,
        }).select("_id");
        if (!actor) {
            console.error("Error at service/actor/service_utils");
            throw new Error("actor not found");
        }
        return actor;
    }
    catch (error) {
        console.error("Error finding actor by playdb Id: ServiceUtils", error);
        throw error;
    }
});
exports.find_actor_by_playdb_id = find_actor_by_playdb_id;
/**
 * 뮤지컬의 object_id가
 * 유효한지 확인해주고
 * 스키마 반환
 */
const find_musical_by_Id = (musical_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const musical = yield musicals_1.default.findById(musical_id);
        if (!musical) {
            console.error("Error at service/actor/service_utils");
            throw new Error("musical not found");
        }
        return musical;
    }
    catch (error) {
        console.error("Error finding musical by Id: ServiceUtils", error);
        throw error;
    }
});
exports.find_musical_by_Id = find_musical_by_Id;
/**
 * 배우의 object_id가
 * 유효한지 확인해주고
 * 스키마 반환
 */
const find_actor_by_id = (actor_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actor = yield actors_1.default.findById(actor_id);
        if (!actor) {
            console.error("Error at service/actor/service_utils");
            throw new Error("actor not found");
        }
        return actor;
    }
    catch (error) {
        console.error("Error finding actor by Id: ServiceUtils", error);
        throw error;
    }
});
exports.find_actor_by_id = find_actor_by_id;
/**
 * 뮤지컬 object_id로
 * [뮤지컬 제목, 출연 배우들][]집합 반환
 */
const get_actors_in_musical = (musical_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const musical = yield find_musical_by_Id(musical_id);
        const musical_actors = yield get_actors_same_musical(musical_id);
        const data = {
            musical_name: (yield musical).musical_name,
            actors: musical_actors.actors,
        };
        return data;
    }
    catch (error) {
        console.error("Error fetching actors in musical: ServiceUtils", error);
        throw error;
    }
});
exports.get_actors_in_musical = get_actors_in_musical;
/**
 * 배우 object_id를 활용해
 * [배우 object_id, 프로필 이미지] 반환
 */
const get_actor_item_by_Id = (actor_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actor = yield find_actor_by_id(actor_id);
        const data = {
            actor_id: actor.id,
            profile_image: actor.profile_image,
        };
        return data;
    }
    catch (error) {
        console.error("Error getting actor's item: ServiceUtils", error);
        throw error;
    }
});
exports.get_actor_item_by_Id = get_actor_item_by_Id;
/**
 * 동일한 뮤지컬 object_id를 가진
 * [배우 프로필] 집합[] 반환
 */
const get_actors_same_musical = (musical_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const musical = yield find_musical_by_Id(musical_id);
        // 특정 뮤지컬에 출연한 모든 배우의 캐스팅 정보를 가져옴
        const castings = yield castings_1.default.find({ musical_id: musical.id });
        const actors_same_musical = [];
        for (const casting of castings) {
            const actor = yield find_actor_by_id(casting.actor_id.toString());
            if (actor) {
                const actor_item = yield get_actor_item_by_Id(actor.id);
                actors_same_musical.push(actor_item);
            }
        }
        const data = {
            actors: actors_same_musical,
        };
        return data;
    }
    catch (error) {
        console.error("Error finding actors with same musical: ServiceUtils", error);
        throw error;
    }
});
exports.get_actors_same_musical = get_actors_same_musical;
/**
 * 뮤지컬 랜덤 반환
 */
const get_random_musical = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const random_musical = yield musicals_1.default.aggregate([{ $sample: { size: 1 } }]);
        if (random_musical.length === 0) {
            throw new Error("finding random musical fail");
        }
        return random_musical[0];
    }
    catch (error) {
        console.error("Error fetching random musical Id: ServiceUtils", error);
        throw error;
    }
});
exports.get_random_musical = get_random_musical;
/**
 * 가수 겸 뮤지컬 배우 랜덤 반환
 */
const get_random_singer = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const random_singer = yield actors_1.default.aggregate([
            {
                $match: {
                    $or: [{ job: "뮤지컬배우, 가수" }, { job: "가수, 뮤지컬배우" }],
                },
            },
            { $sample: { size: 1 } },
        ]);
        if (random_singer.length === 0) {
            throw new Error("finding random singer fail");
        }
        return random_singer[0];
    }
    catch (error) {
        console.error("Error fetching random singer Id: ServiceUtils", error);
        throw error;
    }
});
exports.get_random_singer = get_random_singer;
/**
 * 뮤지컬의 상세 정보 반환
 */
const get_musical_details = (musical_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const musical_details = yield find_musical_by_Id(musical_id);
        if (!musical_details) {
            throw new Error("musical not found");
        }
        return musical_details;
    }
    catch (error) {
        console.error("Error fetching musical details: ServiceUtils", error);
        throw error;
    }
});
exports.get_musical_details = get_musical_details;
/**
 * 배우의 상세 정보 반환
 */
const get_actor_details = (actor_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actor_details = yield find_actor_by_id(actor_id);
        if (!actor_details) {
            throw new Error("actor not found");
        }
        // 배우 조회할때마다 조회수 +1씩 증가
        actor_details.view++;
        yield actor_details.save();
        return actor_details;
    }
    catch (error) {
        console.error("Error fetching musical details: ServiceUtils", error);
        throw error;
    }
});
exports.get_actor_details = get_actor_details;
/**
 * userId로 나이 찾아보기
 */
const find_age_by_userId = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield users_1.default.findById(userId);
        if (user === null || user === void 0 ? void 0 : user.birthday) {
            const today = new Date();
            const birthDate = new Date(user.birthday);
            let age = today.getFullYear() - birthDate.getFullYear();
            const month = today.getMonth() - birthDate.getMonth();
            if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            return age / 10;
        }
        else {
            return 0;
        }
    }
    catch (error) {
        console.error("Error finding person's age by userId: ServiceUtils", error);
        throw error;
    }
});
exports.find_age_by_userId = find_age_by_userId;
//# sourceMappingURL=actor_service_util.js.map