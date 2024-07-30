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
exports.create_actor = exports.get_most_viewed = exports.get_singers = exports.get_many_actors_in_num_random_musical = exports.get_many_actors_in_random_musical = exports.get_actors_in_random_musical = exports.get_all_actors = void 0;
const actor_service_util = __importStar(require("./actor_service_util"));
const actors_1 = __importDefault(require("../../schema/actors"));
/**
 * 모든 배우 반환
 */
const get_all_actors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actor_list = [];
        const all_actors = yield actors_1.default.find();
        all_actors.forEach((actor) => {
            actor_list.push({
                actor_id: actor._id,
                profile_image: actor.profile_image,
                actor_name: actor.actor_name,
                agency: actor.agency,
                birthday: actor.birthday,
            });
        });
        const data = {
            actors: actor_list,
        };
        return data;
    }
    catch (error) {
        console.error("Error fetching all actors: Service", error);
        throw error;
    }
});
exports.get_all_actors = get_all_actors;
/**
 * 랜덤한 뮤지컬 1개의
 * [뮤지컬 제목, 출연 배우들][]집합 반환
 */
const get_actors_in_random_musical = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const random_musical = yield actor_service_util.get_random_musical();
        const musical_actors = yield actor_service_util.get_actors_same_musical(random_musical.id);
        const data = {
            musical_name: random_musical.musical_name,
            actors: musical_actors.actors,
        };
        return data;
    }
    catch (error) {
        console.error("Error fetching actors in random musical: Service", error);
        throw error;
    }
});
exports.get_actors_in_random_musical = get_actors_in_random_musical;
/**
 * 랜덤한 뮤지컬 1개의
 * 출연배우가 5명 이상일 경우에만
 * [뮤지컬 제목, 출연 배우들][]집합 반환
 */
const get_many_actors_in_random_musical = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let musical_actors;
        let random_musical;
        // 출연 배우가 5명 이상인 뮤지컬을 찾을 때까지 반복
        while (true) {
            random_musical = yield actor_service_util.get_random_musical();
            musical_actors = yield actor_service_util.get_actors_same_musical(random_musical.id);
            if (musical_actors.actors.length > 0) {
                break;
            }
        }
        const data = {
            musical_name: random_musical.musical_name,
            actors: musical_actors.actors,
        };
        return data;
    }
    catch (error) {
        console.error("Error fetching more than five actors in random musical: Service", error);
        throw error;
    }
});
exports.get_many_actors_in_random_musical = get_many_actors_in_random_musical;
/**
 * 겹치지 않게끔
 * 랜덤한 뮤지컬 n개의
 * 출연배우가 5명 이상일 경우에만
 * [뮤지컬 제목, 출연 배우들][]집합 반환
 */
const get_many_actors_in_num_random_musical = (n) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const musicalsSet = new Set();
        const musicals = [];
        while (musicals.length < n) {
            const musicalData = yield get_many_actors_in_random_musical();
            if (!musicalsSet.has(musicalData.musical_name)) {
                musicalsSet.add(musicalData.musical_name);
                musicals.push(musicalData);
            }
        }
        return musicals;
    }
    catch (error) {
        console.error("Error fetching three unique musicals with many actors: Service", error);
        throw error;
    }
});
exports.get_many_actors_in_num_random_musical = get_many_actors_in_num_random_musical;
/**
 * 특정 직업(=가수)의 뮤지컬 배우들
 * 10명 랜덤 반환
 */
const get_singers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const unique_singer = new Set();
        const singer_list = [];
        let attempts = 0;
        while (unique_singer.size < 10 && attempts < 50) {
            // 최대 50번 시도
            const singer = yield actor_service_util.get_random_singer(); // actor_service_util.get_random_singer() 호출 수정
            if (!unique_singer.has(singer._id.toString())) {
                unique_singer.add(singer._id.toString());
                singer_list.push({
                    actor_id: singer._id.toString(),
                    profile_image: singer.profile_image,
                });
            }
            attempts++;
        }
        if (unique_singer.size < 10) {
            throw new Error("Not enough unique singers found");
        }
        const data = {
            actors: singer_list,
        };
        return data;
    }
    catch (error) {
        console.error("Error fetching singers: Service", error);
        throw error;
    }
});
exports.get_singers = get_singers;
/**
 * 조회수가 가장 높은 배우 반환
 */
const get_most_viewed = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actor_list = [];
        const top_actors = yield actors_1.default.find()
            .sort({ view: -1 }) // view 필드를 기준으로 내림차순 정렬
            .limit(10);
        top_actors.forEach((actor) => {
            actor_list.push({
                actor_id: actor._id.toString(),
                profile_image: actor.profile_image,
            });
        });
        const data = {
            actors: actor_list,
        };
        return data;
    }
    catch (error) {
        console.error("Error fetching most viewd actors: Service", error);
        throw error;
    }
});
exports.get_most_viewed = get_most_viewed;
/**
 * 더미 데이터 넣기용
 */
const create_actor = (create_actor_dto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const birthday = create_actor_dto.birthday
            ? new Date(create_actor_dto.birthday)
            : undefined;
        const actor = new actors_1.default({
            actor_playdb_id: create_actor_dto.actor_playdb_id,
            actor_name: create_actor_dto.actor_name,
            profile_image: create_actor_dto.profile_image,
            birthday: birthday,
            agency: create_actor_dto.agency,
            physical: create_actor_dto.physical,
            job: create_actor_dto.job,
        });
        yield actor.save();
        const data = {
            _id: actor._id,
        };
        return data;
    }
    catch (error) {
        console.error("Error creating actors: Service", error);
        throw error;
    }
});
exports.create_actor = create_actor;
//# sourceMappingURL=actor_service.js.map