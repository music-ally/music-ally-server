"use strict";
const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');
const app = express();
const { PORT, MONGO_URI } = process.env;
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// CONNECT TO MONGODB SERVER
mongoose
    .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Successfully connected to mongodb'))
    .catch((err) => console.error(err));
app.listen(3000, () => console.log(`서버가 ${PORT}번 포트에서 실행 중`));
//# sourceMappingURL=index.js.map