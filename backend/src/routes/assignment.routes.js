import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware";
import { upload } from "../middlewares/multer.middleware.js";
import { createAssignment, getUserAssignments } from "../controllers/assignment.controllers.js";
const router = Router();

router.use(verifyJWT);

router.route("/").post(upload.array("docs", 5), createAssignment);
router.route("/getAssignments").get(getUserAssignments);

export default router;
