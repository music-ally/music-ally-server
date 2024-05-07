import express, { Express, Request, Response, NextFunction } from 'express'
import session from 'express-session'
import mongoose from 'mongoose';

require('dotenv').config();
const { PORT, MONGO_URI } = process.env;

if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined.');
}

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('port', process.env.PORT || 3000) //  서버 포트
app.set('host', process.env.HOST || '0.0.0.0') // 서버 아이피

try {
    mongoose.connect(MONGO_URI); //mongoDB 연결
    console.log("MongoDB Connected...");
} catch (error: any) {
    console.error(error.message);
    process.exit(1);
}

app.listen(PORT, () => console.log(`서버가 ${PORT}번 포트에서 실행 중`));