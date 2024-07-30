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
const actor_controller = __importStar(require("../controller/actor_controller"));
const auth_1 = __importDefault(require("../middleware/auth"));
const actor_router = express_1.default.Router();
actor_router.get("/actor", auth_1.default, actor_controller.fetch_all_actors);
actor_router.get("/actor/musical", auth_1.default, actor_controller.fetch_actors_appeared);
actor_router.get("/actor/musical/:num", auth_1.default, actor_controller.fetch_num_actors_appeared);
actor_router.get("/actor/job", auth_1.default, actor_controller.fetch_singers);
actor_router.get("/actor/view", auth_1.default, actor_controller.fetch_most_viewed);
actor_router.get("/actor/:actorId", auth_1.default, actor_controller.fetch_actor_details);
actor_router.post("/actor", actor_controller.create_actor);
actor_router.get("/actor/randomMusical/please", auth_1.default, actor_controller.check_random_musicalId);
exports.default = actor_router;
//# sourceMappingURL=actor_router.js.map