import { Router } from "express";
import {
  register,
  logout,
  login,
  refreshAccessToken,
  getCurrentUser,
} from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/register").post(upload.single("avatar"), register);
router.route("/login").post(login);

// Secured routes with Authentication
router.route("/logout").post(verifyJWT, logout);
router.route("/refresh-token").post(refreshAccessToken);

// Current User Data
router.route("/current-user").get(verifyJWT, getCurrentUser);

export default router;
