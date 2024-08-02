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
exports.search_actor = exports.search_musical = void 0;
const musicals_1 = __importDefault(require("../../schema/musicals"));
const theaters_1 = __importDefault(require("../../schema/theaters"));
const actors_1 = __importDefault(require("../../schema/actors"));
const search_musical = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const musicals = yield musicals_1.default.find({
            musical_name: { $regex: keyword, $options: 'i' }
        })
            .populate({
            path: 'theater_id',
            model: theaters_1.default,
            select: 'theater_name'
        }).exec(); //exec()의 필요성,, promise 반환? 인데 잘 모르겠음
        const musical_dto = musicals.map(musical => ({
            musical_id: musical._id,
            poster_image: musical.poster_image,
            musical_name: musical.musical_name,
            start_at: musical.start_at,
            end_at: musical.end_at,
            theater_name: musical.theater_id.theater_name
        }));
        const data = {
            musicals: musical_dto
        };
        return data;
    }
    catch (error) {
        console.error("Error at searching musical: Service", error);
        throw error;
    }
});
exports.search_musical = search_musical;
const search_actor = (keyword) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const actor_list = [];
        const actors = yield actors_1.default.find({
            actor_name: { $regex: keyword, $options: 'i' }
        });
        actors.forEach((actor) => {
            let format_date;
            if (actor.birthday) {
                format_date = actor.birthday.toISOString().split('T')[0].replace(/-/g, '/');
            }
            actor_list.push({
                actor_id: actor._id,
                profile_image: actor.profile_image,
                actor_name: actor.actor_name,
                agency: actor.agency,
                birthday: format_date,
            });
        });
        const data = {
            actors: actor_list,
        };
        return data;
    }
    catch (error) {
        console.error("Error searching actors: Service", error);
        throw error;
    }
});
exports.search_actor = search_actor;
//# sourceMappingURL=search_service.js.map