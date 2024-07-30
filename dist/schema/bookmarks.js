"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bookmarks_schema = new mongoose_1.default.Schema({
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
});
bookmarks_schema.index({ user_id: 1, musical_id: 1 }, { unique: true });
const Bookmarks = mongoose_1.default.model("bookmarks", bookmarks_schema);
exports.default = Bookmarks;
//# sourceMappingURL=bookmarks.js.map