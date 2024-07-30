"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const musical_controller = __importStar(require("../controller/musical_controller"));
const auth_1 = __importDefault(require("../middleware/auth"));
const musical_router = express_1.default.Router();
musical_router.get("/musical", auth_1.default, musical_controller.all_musical);
musical_router.get("/musical/topRank", auth_1.default, musical_controller.find_top_rank_musical);
musical_router.get("/musical/most/review", auth_1.default, musical_controller.find_most_review_musical);
musical_router.get("/musical/most/bookmark", auth_1.default, musical_controller.find_most_bookmark_musical);
musical_router.get("/musical/actor", auth_1.default, musical_controller.find_musical_by_actor);
musical_router.get("/musical/following", auth_1.default, musical_controller.find_musical_by_following);
musical_router.get("/musical/near", auth_1.default, musical_controller.find_near_musical);
musical_router.get("/musical/age/bookmark", auth_1.default, musical_controller.find_musical_my_age_bookmark);
musical_router.get("/musical/age/review", auth_1.default, musical_controller.find_musical_my_age_review);
musical_router.get("/musical/sex/bookmark", auth_1.default, musical_controller.find_musical_my_sex_bookmark);
musical_router.get("/musical/sex/review", auth_1.default, musical_controller.find_musical_my_sex_review);
musical_router.get("/musical/onGoing", auth_1.default, musical_controller.find_ongoing_musical);
musical_router.get("/musical/:musicalId", auth_1.default, musical_controller.musical_detail);
musical_router.post("/musical/:musicalId/bookmark", auth_1.default, musical_controller.bookmark);
musical_router.delete("/musical/:musicalId/bookmark", auth_1.default, musical_controller.cancel_bookmark);
exports.default = musical_router;
//# sourceMappingURL=musical_router.js.map