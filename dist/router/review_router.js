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
const review_controller = __importStar(require("../controller/review_controller"));
const auth_1 = __importDefault(require("../middleware/auth"));
const review_router = express_1.default.Router();
review_router.get("/review", auth_1.default, review_controller.review_main);
review_router.get("/review/:reviewId", auth_1.default, review_controller.review_detail);
review_router.get("/review/writer/profile", auth_1.default, review_controller.writer_profile);
review_router.post("/review", auth_1.default, review_controller.write_review);
review_router.patch("/review/:reviewId", auth_1.default, review_controller.update_review);
review_router.post("/review/:reviewId/like", auth_1.default, review_controller.review_like);
review_router.delete("/review/:reviewId/like", auth_1.default, review_controller.cancel_review_like);
exports.default = review_router;
//# sourceMappingURL=review_router.js.map