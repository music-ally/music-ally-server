"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const users_schema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: false,
    },
    nickname: {
        type: String,
        required: true,
        unique: true,
    },
    birthday: {
        type: Date,
        required: true,
    },
    sex: {
        type: Boolean, // true = 여성, false = 남성
        required: true,
    },
    profile_image: {
        type: String,
        required: false,
    },
    noti_allow: {
        type: Boolean,
        required: false,
        default: true,
    },
    homearea: {
        type: mongoose_1.default.Types.ObjectId,
        require: true,
        ref: "areas",
    },
    signup_method: {
        type: String,
        required: true,
        default: "뮤지컬리"
    },
    social_id: {
        type: String,
        required: false
    },
    is_active: {
        type: Boolean,
        required: true,
        default: true
    },
    delete_date: {
        type: Date,
        required: false,
    },
});
const Users = mongoose_1.default.model("users", users_schema);
exports.default = Users;
//# sourceMappingURL=users.js.map