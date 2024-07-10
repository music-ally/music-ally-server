import express from "express";
import * as musical_controller from "../controller/musical_controller";
import auth from "../middleware/auth";

const musical_router = express.Router();

musical_router.get("/musical", auth, musical_controller.all_musical);
musical_router.get("/musical/topRank", auth, musical_controller.find_top_rank_musical);
musical_router.get("/musical/most/review", auth, musical_controller.find_most_review_musical);
musical_router.get("/musical/most/bookmark", auth, musical_controller.find_most_bookmark_musical);
musical_router.get("/musical/actor", auth, musical_controller.find_musical_by_actor);
musical_router.get("/musical/following", auth, musical_controller.find_musical_by_following);
musical_router.get("/musical/near", auth, musical_controller.find_near_musical);
musical_router.get("/musical/age/bookmark", auth, musical_controller.find_musical_my_age_bookmark);
musical_router.get("/musical/age/review", auth, musical_controller.find_musical_my_age_review);
musical_router.get("/musical/sex/bookmark", auth, musical_controller.find_musical_my_sex_bookmark);
musical_router.get("/musical/sex/review", auth, musical_controller.find_musical_my_sex_review);
musical_router.get("/musical/onGoing", auth, musical_controller.find_ongoing_musical);
musical_router.get("/musical/:musicalId", auth, musical_controller.musical_detail);
musical_router.post("/musical/:musicalId/bookmark", auth, musical_controller.bookmark);
musical_router.delete("/musical/:musicalId/bookmark", auth, musical_controller.cancel_bookmark);


export default musical_router;
