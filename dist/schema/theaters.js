"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const theaters_schema = new mongoose_1.default.Schema({
    theater_playdb_id: {
        type: Number,
        required: true,
    },
    theater_name: {
        type: String,
        required: false,
    },
    theater_address: {
        type: String,
        required: false,
    },
    theater_road_address: {
        type: String,
        required: false,
    },
    area_id: {
        type: mongoose_1.default.Types.ObjectId,
        required: true,
        ref: "areas",
    },
    seats: [{
            type: String,
            required: false,
        }]
});
const Theaters = mongoose_1.default.model("theaters", theaters_schema);
exports.default = Theaters;
//# sourceMappingURL=theaters.js.map