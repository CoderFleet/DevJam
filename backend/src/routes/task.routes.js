import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";
import {
  createTask,
  getUserTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
const router = Router();

router.use(verifyJWT);

router.route("/").post(upload.none(), createTask);

// Fetch all tasks of current user
router.route("/getTasks").get(getUserTasks);

// Task update and delete routes
router.route("/:taskId").patch(updateTask).delete(deleteTask);

export default router;
