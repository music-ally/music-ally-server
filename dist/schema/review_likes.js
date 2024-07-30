"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const review_likes_schema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "users",
    },
    review_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "reviews",
    },
});
review_likes_schema.index({ user_id: 1, review_id: 1 }, { unique: true });
const Review_likes = mongoose_1.default.model("review_likes", review_likes_schema);
exports.default = Review_likes;
//# sourceMappingURL=review_likes.js.map