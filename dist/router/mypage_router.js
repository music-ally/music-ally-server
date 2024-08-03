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
const mypage_controller = __importStar(require("../controller/mypage_controller"));
const auth_1 = __importDefault(require("../middleware/auth"));
const multer_1 = require("../middleware/multer");
const mypage_router = express_1.default.Router();
mypage_router.get("/myPage", auth_1.default, mypage_controller.fetch_my_profile);
mypage_router.get("/myPage/review/:reviewId", auth_1.default, mypage_controller.fetch_mypage_review_detail);
mypage_router.get("/myPage/follower", auth_1.default, mypage_controller.fetch_follower);
mypage_router.get("/myPage/following", auth_1.default, mypage_controller.fetch_following);
mypage_router.patch("/myPage", auth_1.default, multer_1.upload.single('profile_image'), multer_1.processFile, mypage_controller.update_profile);
mypage_router.patch("/myPage/profile/image", auth_1.default, multer_1.upload.single('profile_image'), multer_1.processFile, mypage_controller.update_profile_image);
mypage_router.patch("/myPage/profile/text", auth_1.default, mypage_controller.update_profile_text);
mypage_router.delete("/myPage/review/:reviewId", auth_1.default, mypage_controller.delete_review);
exports.default = mypage_router;
//# sourceMappingURL=mypage_router.js.map