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
exports.check_nickname = exports.check_email = exports.logout = exports.login = exports.leave = exports.join_user = void 0;
const response_form_1 = __importDefault(require("../utils/response_form"));
const response_message_1 = __importDefault(require("../utils/response_message"));
const status_code_1 = __importDefault(require("../utils/status_code"));
const user_service = __importStar(require("../service/user/user_service"));
const join_user = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_join_dto = req.body;
    try {
        const data = yield user_service.join_user(user_join_dto);
        return res
            .status(status_code_1.default.CREATED)
            .send(response_form_1.default.success(response_message_1.default.SIGNUP_SUCCESS, data._id));
    }
    catch (error) {
        if (error.code === 11000) {
            return res
                .status(status_code_1.default.BAD_REQUEST)
                .send(response_form_1.default.fail(response_message_1.default.CONFLICT_EMAIL, error));
        }
        else {
            console.log(error);
            return res
                .status(status_code_1.default.INTERNAL_SERVER_ERROR)
                .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
        }
    }
});
exports.join_user = join_user;
const leave = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_service.leave(req.user_id);
        return res
            .status(status_code_1.default.NO_CONTENT)
            .send(response_form_1.default.success(response_message_1.default.LEAVE_SUCCESS));
    }
    catch (error) {
        console.error("Error at leave: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.leave = leave;
const logout = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield user_service.logout(req.token);
        return res
            .status(status_code_1.default.NO_CONTENT)
            .send(response_form_1.default.success(response_message_1.default.LOGOUT_SUCCESS));
    }
    catch (error) {
        console.error("Error at logout: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.logout = logout;
const login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user_login_dto = req.body;
    try {
        const tokens = yield user_service.login_user(user_login_dto);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.LOGIN_SUCCESS, tokens));
    }
    catch (error) {
        if (error.message === 'email not found') {
            return res
                .status(status_code_1.default.NOT_FOUND)
                .send(response_form_1.default.fail(response_message_1.default.NOT_FOUND_EMAIL, error));
        }
        else if (error.message === 'wrong password') {
            return res
                .status(status_code_1.default.BAD_REQUEST)
                .send(response_form_1.default.fail(response_message_1.default.INVALID_PASSWORD, error));
        }
        else if (error.message === 'left user') {
            return res
                .status(status_code_1.default.BAD_REQUEST)
                .send(response_form_1.default.fail(response_message_1.default.LEFT_USER, error));
        }
        else {
            console.error("Error at login: Controller", error);
            return res
                .status(status_code_1.default.INTERNAL_SERVER_ERROR)
                .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
        }
    }
});
exports.login = login;
const check_email = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield user_service.check_email(req.body.email);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.CHECK_EMAIL_SUCCESS, data));
    }
    catch (error) {
        console.error("Error at check_email: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.check_email = check_email;
const check_nickname = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const is_duplicate = yield user_service.check_nickname(req.body.nickname);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.CHECK_NICKNAME_SUCCESS, is_duplicate));
    }
    catch (error) {
        console.error("Error at check_nickname: Controller", error);
        return res
            .status(status_code_1.default.INTERNAL_SERVER_ERROR)
            .send(response_form_1.default.fail(response_message_1.default.INTERNAL_SERVER_ERROR, error));
    }
});
exports.check_nickname = check_nickname;
//# sourceMappingURL=user_controller.js.map