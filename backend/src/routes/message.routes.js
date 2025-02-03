import { Router } from "express";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { getUsers, getMessages } from "../controllers/message.controller.js";

const router = Router();

router.get("/users", verifyJWT, getUsers);
router.get("/:id", verifyJWT, getMessages);

export default router;
