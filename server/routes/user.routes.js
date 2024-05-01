import express from "express";
import { restrictedRoute } from "../utility/middleware/restrictedRoute.js";
import {
  userFollowUnfollowUser,
  userGetSuggestedProfile,
  userGetUserProfile,
  userUpdateProfile,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/profile/:username", restrictedRoute, userGetUserProfile);
router.get("/suggested-profile", restrictedRoute, userGetSuggestedProfile);
router.post("/follow/:followerId", restrictedRoute, userFollowUnfollowUser);
router.post("/update-profile", restrictedRoute, userUpdateProfile);

export default router;
