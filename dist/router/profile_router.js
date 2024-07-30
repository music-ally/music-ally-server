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
const profile_controller = __importStar(require("../controller/profile_controller"));
const auth_1 = __importDefault(require("../middleware/auth"));
const profile_router = express_1.default.Router();
profile_router.get("/profile/:userId", auth_1.default, profile_controller.fetch_user_profile);
profile_router.get("/profile/:userId/follower", auth_1.default, profile_controller.fetch_user_follower);
profile_router.get("/profile/:userId/following", auth_1.default, profile_controller.fetch_user_following);
profile_router.post("/profile/:userId/follow", auth_1.default, profile_controller.create_follow);
profile_router.delete("/profile/:userId/follow", auth_1.default, profile_controller.delete_follow);
exports.default = profile_router;
//# sourceMappingURL=profile_router.js.map