import express from "express";
import * as profile_controller from "../controller/profile_controller";
import auth from "../middleware/auth";

const profile_router = express.Router();

profile_router.get("/profile/:userId", profile_controller.fetch_user_profile);
profile_router.get("/profile/:userId/follower", profile_controller.fetch_user_follower);
profile_router.get("/profile/:userId/following", profile_controller.fetch_user_following);

// profile_router.post("/profile/:userId/follow", auth, profile_controller.create_follow);
profile_router.post("/profile/:userId/:toUserId/follow", profile_controller.create_follow);

// profile_router.delete("/profile/:userId/follow", auth, profile_controller.delete_follow);
profile_router.delete("/profile/:userId/:toUserId/follow", profile_controller.delete_follow);

export default profile_router;