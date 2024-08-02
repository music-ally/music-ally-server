import express, { Express, Request, Response, NextFunction } from "express";
import connectDB from "./loader/db";
import user_router from "./router/user_router";
import crawler_router from "./router/crawler_router"
import actor_router from "./router/actor_router"
import mypage_router from "./router/mypage_router";
import profile_router from "./router/profile_router";
import musical_router from "./router/musical_router";
import review_router from "./router/review_router";
import notification_router from "./router/notification_router";
import search_router from "./router/search_router";

require("dotenv").config();
const { PORT } = process.env;

const cors = require('cors')
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(user_router);
app.use(crawler_router);
app.use(actor_router);
app.use(mypage_router);
app.use(profile_router);
app.use(review_router);
app.use(musical_router);
app.use(notification_router);
app.use(search_router);


connectDB();

app.set("port", process.env.PORT || 3000); //  서버 포트
app.set("host", process.env.HOST || "0.0.0.0"); // 서버 아이피

const fs = require('fs');
const path = require('path');

const uploadDir = path.join(__dirname, '../uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

app.use('/dist/uploads', express.static(path.join(__dirname, '../dist/uploads')));


app.listen(PORT, () => console.log(`서버가 ${PORT}번 포트에서 실행 중`));
