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
exports.cancel_bookmark = exports.bookmark = exports.musical_detail = exports.find_ongoing_musical = exports.find_musical_my_sex_review = exports.find_musical_my_sex_bookmark = exports.find_musical_my_age_review = exports.find_musical_my_age_bookmark = exports.find_near_musical = exports.find_musical_by_following = exports.find_musical_by_actor = exports.find_most_bookmark_musical = exports.find_most_review_musical = exports.find_top_rank_musical = exports.all_musical = void 0;
const response_form_1 = __importDefault(require("../utils/response_form"));
const response_message_1 = __importDefault(require("../utils/response_message"));
const status_code_1 = __importDefault(require("../utils/status_code"));
const musical_service = __importStar(require("../service/musical/musical_service"));
const all_musical = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield musical_service.all_musical();
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.ALL_MUSICAL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at get all musical: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.all_musical = all_musical;
const find_top_rank_musical = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield musical_service.top_rank_musical();
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.TOP_RANK_MUSICAL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at find top rank musical: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.find_top_rank_musical = find_top_rank_musical;
const find_most_review_musical = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield musical_service.most_review_musical();
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.MOST_REVIEW_MUSICAL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at most_review_musical: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.find_most_review_musical = find_most_review_musical;
const find_most_bookmark_musical = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield musical_service.most_bookmark_musical();
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.MOST_BOOKMARK_MUSICAL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at most_bookmark_musical: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.find_most_bookmark_musical = find_most_bookmark_musical;
const find_musical_by_actor = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield musical_service.random_actor_musical();
    try {
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.ACTOR_MUSICAL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at find random actor's musical: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.find_musical_by_actor = find_musical_by_actor;
const find_musical_by_following = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield musical_service.random_follow_musical(req.user_id);
    try {
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FOLLOWING_MUSICAL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at get following's reviewed musical: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.find_musical_by_following = find_musical_by_following;
const find_musical_my_sex_bookmark = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield musical_service.musical_my_sex_bookmark(req.user_id);
    try {
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.MY_SEX_BOOKMARK_MUSICAL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at get my sex most bookmarked musical: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.find_musical_my_sex_bookmark = find_musical_my_sex_bookmark;
const find_musical_my_sex_review = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield musical_service.musical_my_sex_review(req.user_id);
    try {
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.MY_SEX_REVIEW_MUSICAL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at get my sex most reviewed musical: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.find_musical_my_sex_review = find_musical_my_sex_review;
const find_musical_my_age_bookmark = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield musical_service.musical_my_age_bookmark(req.user_id);
    try {
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.MY_AGE_BOOKMARK_MUSICAL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at my age_group most bookmark musical: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.find_musical_my_age_bookmark = find_musical_my_age_bookmark;
const find_musical_my_age_review = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield musical_service.musical_my_age_review(req.user_id);
    try {
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.MY_AGE_REVIEW_MUSICAL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at my age_group most review musical: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.find_musical_my_age_review = find_musical_my_age_review;
const find_near_musical = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield musical_service.near_musical(req.user_id);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.NEAR_MUSICAL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at near_musical: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.find_near_musical = find_near_musical;
const find_ongoing_musical = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield musical_service.ongoing_musical();
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.ONGOING_MUSICAL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at ongoing musical: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.find_ongoing_musical = find_ongoing_musical;
const musical_detail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { musicalId } = req.params;
    const data = yield musical_service.musical_detail(req.user_id, musicalId);
    try {
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.MUSICAL_DETAIL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at musical_detail: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.musical_detail = musical_detail;
const bookmark = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { musicalId } = req.params;
    try {
        yield musical_service.bookmark(req.user_id, musicalId);
        return res
            .status(status_code_1.default.CREATED)
            .send(response_form_1.default.success(response_message_1.default.BOOKMARK_SUCCESS));
    }
    catch (error) {
        console.error("Error at bookmark: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.bookmark = bookmark;
const cancel_bookmark = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { musicalId } = req.params;
    try {
        yield musical_service.cancel_bookmark(req.user_id, musicalId);
        return res
            .status(status_code_1.default.NO_CONTENT)
            .send(response_form_1.default.success(response_message_1.default.CANCEL_BOOKMARK_SUCCESS));
    }
    catch (error) {
        console.error("Error at cancel_bookmark: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.cancel_bookmark = cancel_bookmark;
//# sourceMappingURL=musical_controller.js.map