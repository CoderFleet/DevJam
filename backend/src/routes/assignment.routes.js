import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createAssignment,
  getUserAssignments,
  updateAssignment,
  deleteAssignment,
} from "../controllers/assignment.controllers.js";
const router = Router();

router.use(verifyJWT);

router.route("/").post(upload.array("docs", 5), createAssignment);

// Fetch all assignments of current user
router.route("/getAssignments").get(getUserAssignments);

// Assignment update and delete routes
router.route("/:assignmentId").patch(updateAssignment).delete(deleteAssignment);

export default router;
