"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const areas_schema = new mongoose_1.default.Schema({
    area_playdb_id: {
        type: String,
        required: true
    },
    area_name: {
        type: String,
        required: true,
    },
});
const Areas = mongoose_1.default.model("areas", areas_schema);
exports.default = Areas;
//# sourceMappingURL=areas.js.map