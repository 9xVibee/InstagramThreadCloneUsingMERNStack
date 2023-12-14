import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import loginUser from "../controllers/UserControllers/loginUser.js";
import logoutUser from "../controllers/UserControllers/logoutUser.js";
import followAndUnfollowUser from "../controllers/UserControllers/followAndUnfollowUser.js";
import signUpUser from "../controllers/UserControllers/signUpUser.js";
import updateUser from "../controllers/UserControllers/updateUser.js";
import getProfileOfUser from "../controllers/UserControllers/getProfileOfUser.js";
import getSuggestedUsers from "../controllers/UserControllers/getSuggestedUsers.js";

const router = express.Router();

router.get("/profile/:query", getProfileOfUser);
router.get("/suggested", protectRoute, getSuggestedUsers);
router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/follow/:id", protectRoute, followAndUnfollowUser);
router.put("/update/:id", protectRoute, updateUser);

export default router;
