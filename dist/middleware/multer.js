"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        const uploadPath = path_1.default.join(__dirname, '..', 'uploads'); // 서버 배포후 정상 작동하는지 확인 필요
        cb(null, uploadPath);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
});
const file_filter = (req, file, cb) => {
    const file_types = /jpeg|jpg|png|gif/;
    const extname = file_types.test(path_1.default.extname(file.originalname).toLowerCase());
    if (extname) {
        return cb(null, true);
    }
    else {
        cb(new Error('Only images are allowed'));
    }
};
const upload = (0, multer_1.default)({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 }, // 5MB limit
    fileFilter: file_filter,
});
exports.default = upload;
//# sourceMappingURL=multer.js.map