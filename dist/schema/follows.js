"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const follows_schema = new mongoose_1.default.Schema({
    from_user_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "users",
    },
    to_user_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "users",
    },
});
follows_schema.index({ from_user_id: 1, to_user_id: 1 }, { unique: true });
const Follows = mongoose_1.default.model("follows", follows_schema);
exports.default = Follows;
//# sourceMappingURL=follows.js.map