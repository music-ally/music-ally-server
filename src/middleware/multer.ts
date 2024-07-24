import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import { Request } from 'express';

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    const uploadPath = path.join(__dirname, '..', 'uploads'); // 서버 배포후 정상 작동하는지 확인 필요
    cb(null, uploadPath);
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const file_filter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  const file_types = /jpeg|jpg|png|gif/;
  const extname = file_types.test(path.extname(file.originalname).toLowerCase());

  if (extname) {
    return cb(null, true);
  } else {
    cb(new Error('Only images are allowed'));
  }
};

const upload = multer({
  storage: storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
  fileFilter: file_filter,
});

export default upload;
