import express from "express";
import { restrictedRoute } from "../utility/middleware/restrictedRoute.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  getAllFollowingPosts,
  getAllPosts,
  getLikedPost,
  getUsersPost,
  likeUnlikePost,
} from "../controllers/post.controllers.js";

const router = express.Router();

router.post("/create", restrictedRoute, createPost);
router.post("/like/:postId", restrictedRoute, likeUnlikePost);
router.post("/comment/:postId", restrictedRoute, commentOnPost);
router.delete("/:postId", restrictedRoute, deletePost);
router.get("/all", restrictedRoute, getAllPosts);
router.get("/following", restrictedRoute, getAllFollowingPosts);
router.get("/likes/:userId", restrictedRoute, getLikedPost);
router.get("/user/:username", restrictedRoute, getUsersPost);

export default router;
