import express from "express";
import * as mypage_controller from "../controller/mypage_controller";
import auth from "../middleware/auth";
import {upload, processFile} from "../middleware/multer";

const mypage_router = express.Router();

mypage_router.get("/myPage", auth, mypage_controller.fetch_my_profile);
mypage_router.get("/myPage/review/:reviewId", auth, mypage_controller.fetch_mypage_review_detail);
mypage_router.get("/myPage/follower", auth, mypage_controller.fetch_follower);
mypage_router.get("/myPage/following", auth, mypage_controller.fetch_following);
mypage_router.patch("/myPage/profile/image", auth, upload.single('profile_image'), processFile, mypage_controller.update_profile_image);
mypage_router.patch("/myPage/profile/text", auth, mypage_controller.update_profile_text);
mypage_router.patch("/myPage", auth, upload.single('profile_image'), processFile, mypage_controller.update_profile);


mypage_router.delete("/myPage/review/:reviewId", auth, mypage_controller.delete_review);

export default mypage_router;