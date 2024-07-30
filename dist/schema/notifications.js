"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notifications_schema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "users",
    },
    type: {
        type: String,
        required: true,
        default: "번외",
    },
    create_at: {
        type: Date,
        required: true,
        default: new Date(),
    },
    review_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: false,
        ref: "reviews",
    },
    review_like_user_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: false,
        ref: "users",
    },
    follower_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: false,
        ref: "users",
    },
});
const Notifications = mongoose_1.default.model("notifications", notifications_schema);
exports.default = Notifications;
//# sourceMappingURL=notifications.js.map