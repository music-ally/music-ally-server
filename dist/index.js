"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./loader/db"));
const user_router_1 = __importDefault(require("./router/user_router"));
const crawler_router_1 = __importDefault(require("./router/crawler_router"));
const actor_router_1 = __importDefault(require("./router/actor_router"));
const mypage_router_1 = __importDefault(require("./router/mypage_router"));
const profile_router_1 = __importDefault(require("./router/profile_router"));
const musical_router_1 = __importDefault(require("./router/musical_router"));
const review_router_1 = __importDefault(require("./router/review_router"));
const notification_router_1 = __importDefault(require("./router/notification_router"));
require("dotenv").config();
const { PORT } = process.env;
const cors = require('cors');
const app = (0, express_1.default)();
app.use(express_1.default.urlencoded({ extended: true }));
app.use(express_1.default.json());
app.use(user_router_1.default);
app.use(crawler_router_1.default);
app.use(actor_router_1.default);
app.use(mypage_router_1.default);
app.use(profile_router_1.default);
app.use(review_router_1.default);
app.use(musical_router_1.default);
app.use(notification_router_1.default);
(0, db_1.default)();
app.set("port", process.env.PORT || 3000); //  서버 포트
app.set("host", process.env.HOST || "0.0.0.0"); // 서버 아이피
app.listen(PORT, () => console.log(`서버가 ${PORT}번 포트에서 실행 중`));
//# sourceMappingURL=index.js.map