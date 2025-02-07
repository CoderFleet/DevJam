import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getUserSchedules,
  deleteSchedule,
} from "../controllers/schedule.controllers.js";

const router = Router();

router.use(verifyJWT);

// Create a new schedule
// router.route("/").post(createSchedule);

// Fetch all schedules of the current user
router.route("/getSchedules").get(getUserSchedules);

// Delete a schedule
router.route("/:scheduleId").delete(deleteSchedule);

export default router;
