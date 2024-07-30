"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const reviews_schema = new mongoose_1.default.Schema({
    user_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "users",
    },
    musical_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "musicals",
    },
    actor_ids: [{
            type: mongoose_1.default.Types.ObjectId,
            required: true,
            ref: "castings",
        }],
    content: {
        type: String,
        required: true,
    },
    watch_at: {
        type: Date,
        required: true,
    },
    create_at: {
        type: Date,
        required: true,
    },
    fear: {
        type: Number,
        required: true,
        default: 0,
    },
    sensitivity: {
        type: Number,
        required: true,
        default: 0,
    },
    violence: {
        type: Number,
        required: true,
        default: 0,
    },
});
const Reviews = mongoose_1.default.model("reviews", reviews_schema);
exports.default = Reviews;
//# sourceMappingURL=reviews.js.map