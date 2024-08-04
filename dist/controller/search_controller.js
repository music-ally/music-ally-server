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
exports.search_musicals = exports.search_actors = void 0;
const response_form_1 = __importDefault(require("../utils/response_form"));
const response_message_1 = __importDefault(require("../utils/response_message"));
const status_code_1 = __importDefault(require("../utils/status_code"));
const search_service = __importStar(require("../service/search/search_service"));
const search_actors = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyword = req.query.keyword;
        const data = yield search_service.search_actor(keyword);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error searching actors: controller/search", error);
        throw error;
    }
});
exports.search_actors = search_actors;
const search_musicals = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const keyword = req.query.keyword;
        const data = yield search_service.search_musical(keyword);
        return res
            .status(status_code_1.default.OK)
            .send(response_form_1.default.success(response_message_1.default.FETCH_SUCCESS, data));
    }
    catch (error) {
        console.error("error searching musicals: controller/search", error);
        throw error;
    }
});
exports.search_musicals = search_musicals;
//# sourceMappingURL=search_controller.js.map