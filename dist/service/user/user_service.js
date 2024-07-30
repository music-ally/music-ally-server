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
exports.logout = exports.check_nickname = exports.check_email = exports.social_login = exports.login_user = exports.find_homearea_by_name = exports.leave = exports.join_user = void 0;
const users_1 = __importDefault(require("../../schema/users"));
const areas_1 = __importDefault(require("../../schema/areas"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jwt_handler_1 = require("../../utils/jwt_handler");
const jwt_blacklist_1 = __importDefault(require("../../schema/jwt_blacklist"));
const find_homearea_by_name = (homearea) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield areas_1.default.findOne({ area_name: homearea }).select('_id');
        if (!data) {
            throw new Error('Homearea not found');
        }
        return data._id;
    }
    catch (error) {
        throw error;
    }
});
exports.find_homearea_by_name = find_homearea_by_name;
const join_user = (user_join_dto) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hashed_password = null;
        let hashed_social_id = null;
        const user_homearea_id = yield find_homearea_by_name(user_join_dto.homearea_name);
        const birthday = new Date(user_join_dto.birthday);
        const sex = user_join_dto.sex === "여성" ? true : false; //true === 여성, false === 남성
        if (user_join_dto.password) {
            hashed_password = yield bcryptjs_1.default.hash(user_join_dto.password, 10);
        }
        if (user_join_dto.social_id) {
            hashed_social_id = yield bcryptjs_1.default.hash(user_join_dto.social_id, 10);
        }
        const user = new users_1.default({
            email: user_join_dto.email,
            password: hashed_password,
            nickname: user_join_dto.nickname,
            birthday: birthday,
            sex: sex,
            homearea: user_homearea_id,
            noti_allow: true,
            signup_method: user_join_dto.signup_method,
            social_id: hashed_social_id
        });
        yield user.save();
        const data = {
            _id: user._id,
        };
        return data;
    }
    catch (error) {
        console.error("Error at join: Service");
        throw error;
    }
});
exports.join_user = join_user;
const leave = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const leave_data = {
            $set: {
                is_active: false,
                delete_date: new Date()
            }
        };
        yield users_1.default.findByIdAndUpdate(user_id, leave_data);
        return;
    }
    catch (error) {
        console.error("Error at leave: Service");
        throw error;
    }
});
exports.leave = leave;
const login_user = (user_login_dto) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.default.findOne({ email: user_login_dto.email });
    if (!user) {
        throw new Error('email not found');
    }
    else if (!user.password) {
        throw new Error('wrong login method(social)');
    }
    else if (!(yield bcryptjs_1.default.compare(user_login_dto.password, user.password))) {
        throw new Error('wrong password');
    }
    else if (!user.is_active) {
        throw new Error('left user');
    }
    const access_token = (0, jwt_handler_1.generate_access_token)(user._id);
    const refresh_token = (0, jwt_handler_1.generate_refresh_token)(user._id);
    return {
        email: user.email,
        access_token,
        refresh_token
    };
});
exports.login_user = login_user;
const social_login = (user_login_dto) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.default.findOne({ email: user_login_dto.email });
    if (!user) {
        throw new Error('email not found');
    }
    else if (!user.social_id) {
        throw new Error('wrong login method');
    }
    else if (!(yield bcryptjs_1.default.compare(user_login_dto.social_id, user.social_id))) {
        throw new Error('wrong social_id');
    }
    else if (!user.is_active) {
        throw new Error('left user');
    }
    const access_token = (0, jwt_handler_1.generate_access_token)(user._id);
    const refresh_token = (0, jwt_handler_1.generate_refresh_token)(user._id);
    return {
        email: user.email,
        access_token,
        refresh_token
    };
});
exports.social_login = social_login;
const check_email = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.default.findOne({ email: email });
    let is_duplicate;
    if (!user) {
        is_duplicate = false;
    }
    else {
        is_duplicate = true;
    }
    return {
        is_duplicate: is_duplicate,
        signup_method: user === null || user === void 0 ? void 0 : user.signup_method
    };
});
exports.check_email = check_email;
const check_nickname = (nickname) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield users_1.default.find({ nickname: nickname });
    let is_duplicate;
    if (user.length === 0) {
        is_duplicate = false;
    }
    else {
        is_duplicate = true;
    }
    return is_duplicate;
});
exports.check_nickname = check_nickname;
const logout = (token) => __awaiter(void 0, void 0, void 0, function* () {
    yield new jwt_blacklist_1.default({ token, expire_at: new Date() }).save();
    return;
});
exports.logout = logout;
//# sourceMappingURL=user_service.js.map