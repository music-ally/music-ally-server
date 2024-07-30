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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const crawler_controller = __importStar(require("../controller/crawler_controller"));
const crawler_router = (0, express_1.Router)();
crawler_router.get('/crawling/musical', crawler_controller.get_musicals_controller);
crawler_router.get('/crawling/actor', crawler_controller.get_actors_controller);
crawler_router.get('/crawling/theater', crawler_controller.get_theaters_controller);
crawler_router.get('/crawling/casting', crawler_controller.get_castings_controller);
crawler_router.post('/crawling/save/musical', crawler_controller.save_musicals_controller);
crawler_router.post('/crawling/save/actor', crawler_controller.save_actors_controller);
crawler_router.post('/crawling/save/theater', crawler_controller.save_theaters_controller);
crawler_router.post('/crawling/save/casting', crawler_controller.save_castings_controller);
exports.default = crawler_router;
//# sourceMappingURL=crawler_router.js.map