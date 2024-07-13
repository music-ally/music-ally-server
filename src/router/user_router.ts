import express from "express";
import * as user_controller from "../controller/user_controller";
import auth from "../middleware/auth";

const user_router = express.Router();

user_router.post("/auth/join", user_controller.join_user);
user_router.patch("/auth/leave", auth, user_controller.deleteUser);
user_router.get("/auth/login", user_controller.login);
user_router.get("/auth/logout", auth, user_controller.logout);
user_router.get("/auth/check/email", user_controller.check_email);
user_router.get("/auth/check/nickname", user_controller.check_nickname);

export default user_router;
