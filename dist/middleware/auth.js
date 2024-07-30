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
const response_form_1 = __importDefault(require("../utils/response_form"));
const response_message_1 = __importDefault(require("../utils/response_message"));
const status_code_1 = __importDefault(require("../utils/status_code"));
const jwt_handler_1 = require("../utils/jwt_handler");
const jwt_blacklist_1 = __importDefault(require("../schema/jwt_blacklist"));
const auth = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        return res
            .status(status_code_1.default.UNAUTHORIZED)
            .send(response_form_1.default.fail(response_message_1.default.NULL_VALUE_TOKEN));
    }
    const token = authHeader.split(' ')[1];
    try {
        const verified_token = (0, jwt_handler_1.verify_token)(token);
        const check_blacklist = yield jwt_blacklist_1.default.findOne({ token });
        if (check_blacklist) {
            return res
                .status(status_code_1.default.UNAUTHORIZED)
                .send(response_form_1.default.fail(response_message_1.default.INVALID_TOKEN));
        }
        req.token = token;
        req.user_id = verified_token.id;
        next();
    }
    catch (err) {
        return res
            .status(status_code_1.default.UNAUTHORIZED)
            .send(response_form_1.default.fail(response_message_1.default.INVALID_TOKEN));
    }
});
exports.default = auth;
//# sourceMappingURL=auth.js.map