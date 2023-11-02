import express from "express";
import protectRoute from "../middleware/protectRoute.js";

// postes controllers import
import createPost from "../controllers/postControllers/createPost.js";
import getPost from "../controllers/postControllers/getPost.js";
import deletePost from "../controllers/postControllers/deletePost.js";
import likePost from "../controllers/postControllers/likePost.js";
import replyToPost from "../controllers/postControllers/replyToPost.js";
import getPostFeed from "../controllers/postControllers/getPostFeed.js";
import getUserPost from "../controllers/postControllers/getUserPost.js";

const router = express.Router();

router.get("/feed", protectRoute, getPostFeed);
router.get("/:id", getPost);
router.get("/user/:username", getUserPost);
router.post("/create", protectRoute, createPost);
router.delete("/delete/:id", protectRoute, deletePost);
router.put("/like/:id", protectRoute, likePost);
router.put("/reply/:id", protectRoute, replyToPost);

export default router;
