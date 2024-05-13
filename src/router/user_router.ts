import express from "express";
import * as user_controller from "../controller/user_controller";

const user_router = express.Router();

user_router.post("/musically/userCreate", user_controller.createUser);

export default user_router;
