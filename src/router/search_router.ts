import express from "express";
import * as search_controller from "../controller/search_controller";
import auth from "../middleware/auth";

const search_router = express.Router();

search_router.get("/search/actor", auth, search_controller.search_actors);
search_router.get("/search/musical", auth, search_controller.search_musicals);

export default search_router;