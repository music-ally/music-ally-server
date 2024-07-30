"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const actors_schema = new mongoose_1.default.Schema({
    actor_playdb_id: {
        type: Number,
        required: true,
    },
    actor_name: {
        type: String,
        required: true,
    },
    profile_image: {
        type: String,
        required: false,
    },
    birthday: {
        type: Date,
        required: false,
    },
    agency: {
        type: String,
        required: false,
    },
    physical: {
        type: String,
        required: false,
    },
    debut: {
        type: String,
        required: false,
    },
    job: {
        type: String,
        required: false,
        default: '뮤지컬배우'
    },
    view: {
        type: Number,
        required: true,
        default: 0
    }
});
const Actors = mongoose_1.default.model("actors", actors_schema);
exports.default = Actors;
//# sourceMappingURL=actors.js.map