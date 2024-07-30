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
const mongoose_1 = __importDefault(require("mongoose"));
const users_1 = __importDefault(require("../schema/users"));
const actors_1 = __importDefault(require("../schema/actors"));
const areas_1 = __importDefault(require("../schema/areas"));
const bookmarks_1 = __importDefault(require("../schema/bookmarks"));
const castings_1 = __importDefault(require("../schema/castings"));
const follows_1 = __importDefault(require("../schema/follows"));
const musicals_1 = __importDefault(require("../schema/musicals"));
const notifications_1 = __importDefault(require("../schema/notifications"));
const review_likes_1 = __importDefault(require("../schema/review_likes"));
const reviews_1 = __importDefault(require("../schema/reviews"));
const theaters_1 = __importDefault(require("../schema/theaters"));
const jwt_blacklist_1 = __importDefault(require("../schema/jwt_blacklist"));
const connectDB = () => __awaiter(void 0, void 0, void 0, function* () {
    require('dotenv').config();
    const { MONGO_URI } = process.env;
    if (!MONGO_URI) {
        throw new Error('MONGO_URI is not defined.');
    }
    try {
        yield mongoose_1.default.connect(MONGO_URI);
        mongoose_1.default.set('autoCreate', true);
        users_1.default.createCollection().then(function (collection) {
            console.log('Users Collection is created!');
        });
        actors_1.default.createCollection().then(function (collection) {
            console.log('Actors Collection is created!');
        });
        areas_1.default.createCollection().then(function (collection) {
            console.log('Areas Collection is created!');
        });
        bookmarks_1.default.createCollection().then(function (collection) {
            console.log('Bookmarks Collection is created!');
        });
        castings_1.default.createCollection().then(function (collection) {
            console.log('Castings Collection is created!');
        });
        follows_1.default.createCollection().then(function (collection) {
            console.log('Follows Collection is created!');
        });
        musicals_1.default.createCollection().then(function (collection) {
            console.log('Musicals Collection is created!');
        });
        notifications_1.default.createCollection().then(function (collection) {
            console.log('Notifications Collection is created!');
        });
        review_likes_1.default.createCollection().then(function (collection) {
            console.log('Review_likes Collection is created!');
        });
        reviews_1.default.createCollection().then(function (collection) {
            console.log('Reviews Collection is created!');
        });
        theaters_1.default.createCollection().then(function (collection) {
            console.log('Theaters Collection is created!');
        });
        jwt_blacklist_1.default.createCollection().then(function (collection) {
            console.log('Blacklists Collection is created!');
        });
    }
    catch (err) {
        console.log(err.message);
        process.exit(1);
    }
});
exports.default = connectDB;
//# sourceMappingURL=db.js.map