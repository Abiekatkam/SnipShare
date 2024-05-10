import express from "express";
import { restrictedRoute } from "../utility/middleware/restrictedRoute.js";
import {
  userDeleteProfile,
  userFollowUnfollowUser,
  userFollowersList,
  userFollowingsList,
  userGetSuggestedProfile,
  userGetUserProfile,
  userRemoveUser,
  userUpdateProfile,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.get("/profile/:username", restrictedRoute, userGetUserProfile);
router.get("/suggested-profile", restrictedRoute, userGetSuggestedProfile);
router.post("/followers-list", restrictedRoute, userFollowersList);
router.post("/following-list", restrictedRoute, userFollowingsList);
router.post("/follow", restrictedRoute, userFollowUnfollowUser);
router.post("/remove-user", restrictedRoute, userRemoveUser);
router.post("/update-profile", restrictedRoute, userUpdateProfile);
router.delete("/delete-profile", restrictedRoute, userDeleteProfile);

export default router;
