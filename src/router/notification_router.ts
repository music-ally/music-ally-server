import express from "express";
import * as notification_controller from "../controller/notification_controller";
import auth from "../middleware/auth";

const notification_router = express.Router();

notification_router.get("/notification", auth, notification_controller.fetch_notifications);
notification_router.get("/notification/onoff", auth, notification_controller.change_notification);

export default notification_router;