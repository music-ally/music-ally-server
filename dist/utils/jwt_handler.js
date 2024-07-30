"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verify_token = exports.generate_refresh_token = exports.generate_access_token = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const JWT_SECRET = process.env.JWT_SECRET;
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
const generate_access_token = (id) => {
    return jsonwebtoken_1.default.sign({ id }, JWT_SECRET, {
        expiresIn: '1d', // 토큰의 유효시간 = 1시간 
    });
};
exports.generate_access_token = generate_access_token;
const generate_refresh_token = (id) => {
    return jsonwebtoken_1.default.sign({ id }, JWT_REFRESH_SECRET, {
        expiresIn: '1d', // 토큰의 유효시간 = 하루
    });
};
exports.generate_refresh_token = generate_refresh_token;
const verify_token = (token, isRefreshToken = false) => {
    const secret = isRefreshToken ? JWT_REFRESH_SECRET : JWT_SECRET;
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.verify_token = verify_token;
//# sourceMappingURL=jwt_handler.js.map