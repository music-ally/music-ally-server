import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';

require("dotenv").config();

// 업로드 디렉토리 설정
const uploadDir = path.join(__dirname, '..', 'uploads');

// 업로드 디렉토리가 존재하지 않으면 생성
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, uploadDir);
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const fileTypes = /jpeg|jpg|png|gif/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: fileFilter,
});

const processFile = (req: Request, res: Response, next: NextFunction) => {
  if (req.file) {
    req.file.path = `${process.env.BASE_URL}/uploads/${req.file.filename}`;
  }
  next();
};

export { upload, processFile };
