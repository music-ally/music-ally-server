"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.check_follow = void 0;
const follows_1 = __importDefault(require("../../schema/follows"));
/**
 * 내가 특정 유저의 팔로워인지 확인
 * (= 내가 특정 유저를 팔로우하는지 확인)
 */
const check_follow = (user_id, to_user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const do_follow = yield follows_1.default.findOne({
            from_user_id: user_id,
            to_user_id: to_user_id,
        });
        if (do_follow) {
            return ("팔로잉");
        }
        else {
            return ("팔로우");
        }
    }
    catch (error) {
        console.error("Error checking I follow someone: Service", error);
        throw error;
    }
});
exports.check_follow = check_follow;
//# sourceMappingURL=profile_service_utils.js.map