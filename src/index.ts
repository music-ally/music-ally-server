import express, { Express, Request, Response, NextFunction } from 'express'
import session from 'express-session'
import mongoose from 'mongoose';
require('dotenv').config();

// const { PORT, MONGO_URI } = process.env;

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('port', process.env.PORT || 3000) //  서버 포트
app.set('host', process.env.HOST || '0.0.0.0') // 서버 아이피

// CONNECT TO MONGODB SERVER
// mongoose
//   .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('Successfully connected to mongodb'))
//   .catch((err:Error) => console.error(err));

app.listen(3000, () => console.log(`서버가 3000번 포트에서 실행 중`));