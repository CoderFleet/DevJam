import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import {
  getUsers,
  getMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/users", verifyJWT, getUsers);
router.get("/:id", verifyJWT, getMessages);

router.post("/send/:id", verifyJWT, upload.single("img"), sendMessage);

export default router;
