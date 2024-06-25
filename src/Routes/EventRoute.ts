import { Router } from "express";
const router: Router = Router();
import * as EventController from "../Controllers/EventController";

//create event
router.post("/", EventController.createEvent);

//get event
router.get("/:eventId", EventController.getEvent);

//get event
router.get("/", EventController.getEventAll);

//update event
router.patch("/", EventController.updateEvent);

// delete Event
router.delete("/:eventId", EventController.deleteEvent)

export default router;
