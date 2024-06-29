import express from "express";
import * as actor_controller from "../controller/actor_controller";
import auth from "../middleware/auth";

const actor_router = express.Router();
 
actor_router.get("/actor/musicalAppeard", actor_controller.fetch_actors_appeared);
actor_router.get("/actor/job", actor_controller.fetch_singers);
actor_router.get("/actor/:actorId", actor_controller.fetch_actor_details);
actor_router.post("/actor", actor_controller.create_actor);

export default actor_router;