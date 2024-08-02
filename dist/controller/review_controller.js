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
exports.writer_profile = exports.cancel_review_like = exports.review_like = exports.update_review = exports.write_review = exports.review_detail = exports.review_main = void 0;
const response_form_1 = __importDefault(require("../utils/response_form"));
const response_message_1 = __importDefault(require("../utils/response_message"));
const status_code_1 = __importDefault(require("../utils/status_code"));
const review_service = __importStar(require("../service/review/review_service"));
const write_review = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const review_write_dto = req.body;
    try {
        const data = yield review_service.write_review(req.user_id, review_write_dto);
        return res
            .status(status_code_1.default.CREATED)
            .send(response_form_1.default.success(response_message_1.default.REVIEW_WRITE_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at write_review: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.write_review = write_review;
const review_main = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield review_service.review_main(req.user_id);
    try {
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.GET_REVIEW_MAIN_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at get main_review: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.review_main = review_main;
const review_detail = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    const data = yield review_service.review_detail(reviewId, req.user_id);
    try {
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.REVIEW_DETAIL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at review_detail: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.review_detail = review_detail;
const update_review = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const review_update_dto = req.body;
    const { reviewId } = req.params;
    try {
        const data = yield review_service.update_review(reviewId, review_update_dto);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.UPDATE_REVIEW_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at update_review: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.update_review = update_review;
const review_like = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    try {
        yield review_service.review_like(req.user_id, reviewId);
        return res
            .status(status_code_1.default.CREATED)
            .send(response_form_1.default.success(response_message_1.default.REVIEW_LIKE_SUCCESS));
    }
    catch (error) {
        console.error("Error at review_like: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.review_like = review_like;
const cancel_review_like = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { reviewId } = req.params;
    try {
        yield review_service.cancel_review_like(req.user_id, reviewId);
        return res
            .status(status_code_1.default.NO_CONTENT)
            .send(response_form_1.default.success(response_message_1.default.CANCEL_REVIEW_LIKE_SUCCESS));
    }
    catch (error) {
        console.error("Error at cancel_review_like: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.cancel_review_like = cancel_review_like;
const writer_profile = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield review_service.writer_profile(req.user_id);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.GET_WRITER_PROFILE_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at get writer_profile: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.writer_profile = writer_profile;
//# sourceMappingURL=review_controller.js.map