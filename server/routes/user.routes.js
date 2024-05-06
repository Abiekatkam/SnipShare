import express from "express";
import { restrictedRoute } from "../utility/middleware/restrictedRoute.js";
import {
  userDeleteProfile,
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
router.delete("/delete-profile", restrictedRoute, userDeleteProfile)

export default router;
