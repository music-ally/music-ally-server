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
exports.check_random_musicalId = exports.create_actor = exports.fetch_actor_details = exports.fetch_most_viewed = exports.fetch_singers = exports.fetch_num_actors_appeared = exports.fetch_actors_appeared = exports.fetch_all_actors = void 0;
const response_form_1 = __importDefault(require("../utils/response_form"));
const response_message_1 = __importDefault(require("../utils/response_message"));
const status_code_1 = __importDefault(require("../utils/status_code"));
const actor_service = __importStar(require("../service/actor/actor_service"));
const actor_service_util = __importStar(require("../service/actor/actor_service_util"));
/**
 * 모든 배우 반환
 */
const fetch_all_actors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield actor_service.get_all_actors();
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error fetching all actors: controller/actor", error);
        throw error;
    }
});
exports.fetch_all_actors = fetch_all_actors;
/**
 * 특정 뮤지컬 출연 배우 반환
 */
const fetch_actors_appeared = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield actor_service.get_many_actors_in_random_musical();
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error fetching actors appeared in musical: controller/actor", error);
        throw error;
    }
});
exports.fetch_actors_appeared = fetch_actors_appeared;
/**
 * 특정 뮤지컬(n개) 출연 배우 반환
 */
const fetch_num_actors_appeared = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const n = parseInt(req.params.num);
    try {
        const data = yield actor_service.get_many_actors_in_num_random_musical(n);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error fetching actors appeared in num musical: controller/actor", error);
        throw error;
    }
});
exports.fetch_num_actors_appeared = fetch_num_actors_appeared;
/**
 * 가수 겸 뮤지컬 배우 반환
 */
const fetch_singers = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield actor_service.get_singers();
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error fetching singers: controller/actor", error);
        throw error;
    }
});
exports.fetch_singers = fetch_singers;
/**
 * 조회수가 가장 높은 배우 반환
 */
const fetch_most_viewed = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield actor_service.get_most_viewed();
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error fetching most viewed actor: controller/actor", error);
        throw error;
    }
});
exports.fetch_most_viewed = fetch_most_viewed;
/**
 * 특정 배우 정보 반환
 */
const fetch_actor_details = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const actor_id = req.params.actorId;
    try {
        const data = yield actor_service_util.get_actor_details(actor_id);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error fetching actor's details: controller/actor", error);
        throw error;
    }
});
exports.fetch_actor_details = fetch_actor_details;
/**
 * 더미 데이터 넣기 용
 */
const create_actor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const create_actor_dto = req.body;
    try {
        const data = yield actor_service.create_actor(create_actor_dto);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.CREATE_SUCCESS, data));
    }
    catch (error) {
        console.error("error creating actor: controller/actor", error);
        throw error;
    }
});
exports.create_actor = create_actor;
/**
 * 랜덤 뮤컬아이디 잘 반환하는지 확인하는용
 */
const check_random_musicalId = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield actor_service_util.get_random_musical();
        return data;
    }
    catch (error) {
        console.error("error fetching random musical: controller/actor", error);
        throw error;
    }
});
exports.check_random_musicalId = check_random_musicalId;
//# sourceMappingURL=actor_controller.js.map