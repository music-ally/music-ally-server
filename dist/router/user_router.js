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
const user_controller = __importStar(require("../controller/user_controller"));
const auth_1 = __importDefault(require("../middleware/auth"));
const user_router = express_1.default.Router();
user_router.post("/auth/join", user_controller.join_user);
user_router.patch("/auth/leave", auth_1.default, user_controller.leave);
user_router.get("/auth/login", user_controller.login);
user_router.get("/auth/logout", auth_1.default, user_controller.logout);
user_router.get("/auth/check/email", user_controller.check_email);
user_router.get("/auth/check/nickname", user_controller.check_nickname);
exports.default = user_router;
//# sourceMappingURL=user_router.js.map