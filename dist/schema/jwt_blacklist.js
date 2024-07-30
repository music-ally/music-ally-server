"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const blacklist_schema = new mongoose_1.default.Schema({
    token: {
        type: String,
        required: true,
    },
    expire_at: {
        type: Date,
        required: true,
    },
});
const Blacklists = mongoose_1.default.model("blacklists", blacklist_schema);
exports.default = Blacklists;
//# sourceMappingURL=jwt_blacklist.js.map