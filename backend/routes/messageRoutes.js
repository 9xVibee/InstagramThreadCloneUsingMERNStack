import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import sendMessage from "../controllers/messageControllers/sendMessage.js";
import getMessages from "../controllers/messageControllers/getMessages.js";
import getConversations from "../controllers/messageControllers/getConversations.js";

const router = express.Router();

router.get("/conversations", protectRoute, getConversations);
router.get("/:otherUserId", protectRoute, getMessages);
router.post("/", protectRoute, sendMessage);
export default router;
