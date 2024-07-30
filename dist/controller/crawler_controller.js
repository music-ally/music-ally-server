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
exports.save_castings_controller = exports.save_theaters_controller = exports.save_actors_controller = exports.save_musicals_controller = exports.get_castings_controller = exports.get_theaters_controller = exports.get_actors_controller = exports.get_musicals_controller = void 0;
const crawler_service = __importStar(require("../service/crawler_service"));
const axios_1 = __importDefault(require("axios"));
const get_musicals_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const musicals = yield crawler_service.get_musicals();
        res.status(200).json(musicals);
    }
    catch (error) {
        console.error("Error in fetchMusicalsController:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.get_musicals_controller = get_musicals_controller;
const get_actors_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const artists = yield crawler_service.get_actors();
        res.status(200).json(artists);
    }
    catch (error) {
        console.error("Error in fetchArtistsController:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.get_actors_controller = get_actors_controller;
const get_theaters_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const theaters = yield crawler_service.get_theaters();
        res.status(200).json(theaters);
    }
    catch (error) {
        console.error("Error in fetchTheatersController:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.get_theaters_controller = get_theaters_controller;
const get_castings_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const castings = yield crawler_service.get_castings();
        res.status(200).json(castings);
    }
    catch (error) {
        console.error("Error in fetchCastingsController:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});
exports.get_castings_controller = get_castings_controller;
const save_musicals_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("http://localhost:3000/crawling/musical");
        const musicals = response.data;
        yield crawler_service.save_musicals(musicals);
        res.status(201).json({ message: "Musicals saved successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error saving musicals", error });
    }
});
exports.save_musicals_controller = save_musicals_controller;
const save_actors_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("http://localhost:3000/crawling/actor");
        const actors = response.data;
        yield crawler_service.save_actors(actors);
        res.status(201).json({ message: "Actors saved successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error saving actors", error });
    }
});
exports.save_actors_controller = save_actors_controller;
const save_theaters_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("http://localhost:3000/crawling/theater");
        const theaters = response.data;
        yield crawler_service.save_theaters(theaters);
        res.status(201).json({ message: "Theaters saved successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error saving theaters", error });
    }
});
exports.save_theaters_controller = save_theaters_controller;
const save_castings_controller = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield axios_1.default.get("http://localhost:3000/crawling/casting");
        const castings = response.data;
        yield crawler_service.save_castings(castings);
        res.status(201).json({ message: "Castings saved successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Error saving castings", error });
    }
});
exports.save_castings_controller = save_castings_controller;
//# sourceMappingURL=crawler_controller.js.map