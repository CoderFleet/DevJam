import { Router } from "express";
import { register, login } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middlewares.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);

export default router;
