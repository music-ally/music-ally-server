"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const musicals_schema = new mongoose_1.default.Schema({
    musical_playdb_id: {
        type: Number,
        required: true,
    },
    musical_name: {
        type: String,
        required: true,
    },
    musical_subname: {
        type: String,
        required: false,
    },
    musical_genre: {
        type: String,
        required: false,
    },
    start_at: {
        type: String,
        required: true,
    },
    end_at: {
        type: String,
        required: true,
    },
    theater_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "theaters"
    },
    theater_name: {
        type: String,
        required: false,
    },
    age_limit: {
        type: String,
        required: false,
    },
    runtime: {
        type: String,
        required: false,
    },
    website: {
        type: String,
        required: false,
    },
    poster_image: {
        type: String,
        required: true,
    },
    view: {
        type: Number,
        required: true,
        default: 0,
    }
});
const Musicals = mongoose_1.default.model("musicals", musicals_schema);
exports.default = Musicals;
//# sourceMappingURL=musicals.js.map