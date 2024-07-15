import express from "express";
import * as actor_controller from "../controller/actor_controller";
import auth from "../middleware/auth";

const actor_router = express.Router();

actor_router.get("/actor", auth, actor_controller.fetch_all_actors);
actor_router.get("/actor/musical", auth, actor_controller.fetch_actors_appeared);
actor_router.get("/actor/musical/:num", auth, actor_controller.fetch_num_actors_appeared);
actor_router.get("/actor/job", auth, actor_controller.fetch_singers);
actor_router.get("/actor/view", auth, actor_controller.fetch_most_viewed);
actor_router.get("/actor/:actorId", auth, actor_controller.fetch_actor_details);

actor_router.post("/actor", actor_controller.create_actor);

export default actor_router;