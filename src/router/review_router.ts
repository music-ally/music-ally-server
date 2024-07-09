import express from "express";
import * as review_controller from "../controller/review_controller";
import auth from "../middleware/auth";

const review_router = express.Router();

review_router.get("/review", auth, review_controller.review_main);
review_router.get("/review/:reviewId", auth, review_controller.review_detail);
review_router.post("/review", auth, review_controller.write_review);
review_router.patch("/review/:reviewId", auth, review_controller.update_review);
review_router.post("/review/:reviewId/like", auth, review_controller.review_like);
review_router.delete("/review/:reviewId/like", auth, review_controller.cancel_review_like);

export default review_router;
