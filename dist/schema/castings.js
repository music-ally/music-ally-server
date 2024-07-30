"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const castings_schema = new mongoose_1.default.Schema({
    actor_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "actors",
    },
    musical_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "musicals",
    },
    role: {
        type: String,
        required: false,
    },
});
const Castings = mongoose_1.default.model("castings", castings_schema);
exports.default = Castings;
//# sourceMappingURL=castings.js.map