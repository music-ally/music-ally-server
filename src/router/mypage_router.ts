import express from "express";
import * as mypage_controller from "../controller/mypage_controller";
import auth from "../middleware/auth";

const mypage_router = express.Router();

// mypage_router.get("/myPage", mypage_controller.fetch_my_profile);
mypage_router.get("/myPage/:userId", mypage_controller.fetch_my_profile);
mypage_router.get("/myPage/review/:reviewId", mypage_controller.fetch_mypage_review_detail);
// mypage_router.get("/myPage/follower", mypage_controller.fetch_follower);
// mypage_router.get("/myPage/following", mypage_controller.fetch_following);
mypage_router.get("/myPage/follower/:userId", mypage_controller.fetch_follower);
mypage_router.get("/myPage/following/:userId", mypage_controller.fetch_following);

// mypage_router.patch("/myPage", mypage_controller.update_profile);
mypage_router.patch("/myPage/:userId", mypage_controller.update_profile);

mypage_router.delete("/myPage/review/:reviewId", mypage_controller.delete_review);

export default mypage_router;