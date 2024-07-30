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
exports.fetch_user_following = exports.fetch_user_follower = exports.fetch_user_profile = exports.delete_follow = exports.create_follow = void 0;
const response_form_1 = __importDefault(require("../utils/response_form"));
const response_message_1 = __importDefault(require("../utils/response_message"));
const status_code_1 = __importDefault(require("../utils/status_code"));
const profile_service = __importStar(require("../service/profile/profile_service"));
/**
 * 팔로우 하기
 */
const create_follow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 다른 유저 아이디
    const to_user_id = req.params.userId;
    try {
        const data = yield profile_service.do_follow(req.user_id, to_user_id);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.CREATE_SUCCESS, data));
    }
    catch (error) {
        console.error("error following: controller/profile", error);
        throw error;
    }
});
exports.create_follow = create_follow;
/**
 * 팔로우 취소 하기
 */
const delete_follow = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 다른 유저 아이디
    const to_user_id = req.params.userId;
    try {
        const data = yield profile_service.cancel_follow(req.user_id, to_user_id);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.DELETE_SUCCESS, data));
    }
    catch (error) {
        console.error("error cancel following: controller/profile", error);
        throw error;
    }
});
exports.delete_follow = delete_follow;
/**
 * 다른 유저 프로필 반환
 */
const fetch_user_profile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 다른 유저 아이디
    const user_id = req.params.userId;
    try {
        const data = yield profile_service.get_user_profile(req.user_id, user_id);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error fetching user's profile: controller/profile", error);
        throw error;
    }
});
exports.fetch_user_profile = fetch_user_profile;
/**
 * 다른 유저 팔로워 목록 보기
 */
const fetch_user_follower = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 다른 유저 아이디
    const user_id = req.params.userId;
    try {
        const data = yield profile_service.get_others_follower(req.user_id, user_id);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error fetching user's follower: controller/profile", error);
        throw error;
    }
});
exports.fetch_user_follower = fetch_user_follower;
/**
 * 다른 유저 팔로잉 목록 보기
 */
const fetch_user_following = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 다른 유저 아이디
    const user_id = req.params.userId;
    try {
        const data = yield profile_service.get_others_following(req.user_id, user_id);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error fetching user's following: controller/profile", error);
        throw error;
    }
});
exports.fetch_user_following = fetch_user_following;
//# sourceMappingURL=profile_controller.js.map