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
exports.save_castings = exports.save_theaters = exports.save_musicals = exports.save_actors = exports.get_castings = exports.get_theaters = exports.get_actors = exports.get_musicals = void 0;
const playdb_crawler = __importStar(require("../crawler/playdb_crawler"));
const mongoose_1 = __importDefault(require("mongoose"));
const musicals_1 = __importDefault(require("../schema/musicals"));
const theaters_1 = __importDefault(require("../schema/theaters"));
const areas_1 = __importDefault(require("../schema/areas"));
const actors_1 = __importDefault(require("../schema/actors"));
const castings_1 = __importDefault(require("../schema/castings"));
const get_musicals = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield playdb_crawler.fetch_all_musicals();
        return data;
    }
    catch (error) {
        console.error("Error in getMusicals service:", error);
        throw error;
    }
});
exports.get_musicals = get_musicals;
const get_actors = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield playdb_crawler.fetch_all_actors();
        return data;
    }
    catch (error) {
        console.error("Error in getArtists service:", error);
        throw error;
    }
});
exports.get_actors = get_actors;
const get_theaters = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield playdb_crawler.fetch_all_theaters();
        return data;
    }
    catch (error) {
        console.error("Error in getTheaters service:", error);
        throw error;
    }
});
exports.get_theaters = get_theaters;
const get_castings = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield playdb_crawler.fetch_all_castings();
        return data;
    }
    catch (error) {
        console.error("Error in getCastings service:", error);
        throw error;
    }
});
exports.get_castings = get_castings;
const save_musicals = (musicals) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const musical of musicals) {
            const crawler_theater = yield theaters_1.default.findOne({
                seats: musical.musical_details.place,
            });
            const start_date = musical.musical_details.date.split("~")[0];
            const end_date = musical.musical_details.date.split("~")[1];
            let insert_theater_id;
            if (!crawler_theater || !musical.musical_details.place) {
                // '알수없음'으로 극장 저장
                insert_theater_id = new mongoose_1.default.Types.ObjectId("66a3d8605077119748ebb6c4");
            }
            else {
                insert_theater_id = crawler_theater._id;
            }
            const existing_musical = yield musicals_1.default.findOne({
                musical_playdb_id: musical.musical_ID,
            });
            if (!existing_musical) {
                // 뮤지컬 저장
                const musical_data = new musicals_1.default({
                    musical_playdb_id: musical.musical_ID,
                    musical_name: musical.musical_details.title || "",
                    musical_subname: musical.musical_details.sub_title || "",
                    musical_genre: musical.musical_details.genre || "",
                    start_at: start_date || "",
                    end_at: end_date || "",
                    theater_id: insert_theater_id,
                    theater_name: musical.musical_details.place || "",
                    age_limit: musical.musical_details.age_limit || "",
                    runtime: musical.musical_details.runtime || "",
                    website: musical.musical_details.website || "",
                    poster_image: musical.musical_details.image_url || "",
                });
                yield musical_data.save();
            }
            else {
                const update_data = yield existing_musical.updateOne({
                    musical_name: musical.musical_details.title,
                    musical_subname: musical.musical_details.sub_title || "",
                    musical_genre: musical.musical_details.genre || "",
                    start_at: start_date || "",
                    end_at: end_date || "",
                    theater_id: insert_theater_id,
                    theater_name: musical.musical_details.place || "",
                    age_limit: musical.musical_details.age_limit || "",
                    runtime: musical.musical_details.runtime || "",
                    website: musical.musical_details.website || "",
                    poster_image: musical.musical_details.image_url || "",
                });
            }
        }
        console.log("Musicals saved successfully in service...🎭");
    }
    catch (error) {
        console.error("Error in save Musicals : service", error);
        throw error;
    }
});
exports.save_musicals = save_musicals;
const save_actors = (actors) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const actor of actors) {
            const existing_actor = yield actors_1.default.findOne({
                actor_playdb_id: actor.actor_ID,
            });
            if (!existing_actor) {
                const data = new actors_1.default({
                    actor_playdb_id: actor.actor_ID,
                    actor_name: actor.actor_details.name || "",
                    profile_image: actor.actor_details.profile_image || "",
                    birthday: actor.actor_details.birthday || "",
                    agency: actor.actor_details.agency || "",
                    physical: actor.actor_details.physical || "",
                    debut: actor.actor_details.debut || "",
                    job: actor.actor_details.job || "",
                });
                yield data.save();
            }
            else {
                yield existing_actor.updateOne({
                    actor_playdb_id: actor.actor_ID,
                    actor_name: actor.actor_details.name || "",
                    profile_image: actor.actor_details.profile_image || "",
                    birthday: actor.actor_details.birthday || "",
                    agency: actor.actor_details.agency || "",
                    physical: actor.actor_details.physical || "",
                    debut: actor.actor_details.debut || "",
                    job: actor.actor_details.job || "",
                });
            }
        }
    }
    catch (error) {
        console.error("Error in save Actors : service", error);
        throw error;
    }
});
exports.save_actors = save_actors;
const save_theaters = (theaters) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const theater of theaters) {
            const location = yield areas_1.default.findOne({ area_name: theater.location });
            let location_id;
            if (!theater.location || !location) {
                location_id = new mongoose_1.default.Types.ObjectId("66a34d4b344abfd30961c724");
            }
            else {
                location_id = location === null || location === void 0 ? void 0 : location._id;
            }
            const existing_theater = yield theaters_1.default.findOne({
                theater_playdb_id: theater.theater_ID,
            });
            if (!existing_theater) {
                const data = new theaters_1.default({
                    theater_playdb_id: theater.theater_ID,
                    theater_name: theater.name || "",
                    area_id: location_id,
                    theater_address: theater.theater_details.address || "",
                    theater_road_address: theater.theater_details.road_address || "",
                    seats: theater.theater_details.seats || "",
                });
                yield data.save();
            }
            else {
                yield existing_theater.updateOne({
                    theater_playdb_id: theater.theater_ID,
                    theater_name: theater.name || "",
                    area_id: location_id,
                    theater_address: theater.theater_details.address || "",
                    theater_road_address: theater.theater_details.road_address || "",
                    seats: theater.theater_details.seats || "",
                });
            }
        }
        console.log("Theaters saved successfully in service...🏤");
    }
    catch (error) {
        console.error("Error in save Theaters : service", error);
        throw error;
    }
});
exports.save_theaters = save_theaters;
const save_castings = (castings) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        for (const casting of castings) {
            for (const cast of casting.cast) {
                const musical = yield musicals_1.default.findOne({
                    musical_playdb_id: casting.musical_ID,
                });
                if (!musical) {
                    console.error("Musical not found");
                    continue;
                }
                else if (!cast) {
                    console.error("Cast not found");
                    continue;
                }
                else if (cast) {
                    for (const actor of cast.cast_names) {
                        const actor_data = yield actors_1.default.findOne({
                            actor_playdb_id: actor.actor_ID,
                        });
                        if (!actor_data) {
                            console.error("Actor not found");
                            continue;
                        }
                        const existing_casting = yield castings_1.default.findOne({
                            musical_id: musical._id,
                            actor_id: actor_data._id,
                        });
                        if (!existing_casting) {
                            const data = new castings_1.default({
                                musical_id: musical._id,
                                actor_id: actor_data._id,
                                role: cast.role || "",
                            });
                            yield data.save();
                        }
                        else {
                            yield existing_casting.updateOne({
                                musical_id: musical._id,
                                actor_id: actor_data._id,
                                role: cast.role || "",
                            });
                        }
                    }
                }
            }
        }
        console.log("Castings saved successfully in service...👩🧑👨");
    }
    catch (error) {
        console.error("Error in save Castings : service", error);
        throw error;
    }
});
exports.save_castings = save_castings;
//# sourceMappingURL=crawler_service.js.map