import express from "express";
import { restrictedRoute } from "../utility/middleware/restrictedRoute.js";
import {
  commentOnPost,
  createPost,
  deletePost,
  editPost,
  getAllFollowingPosts,
  getAllPosts,
  getLikedPost,
  getSinglePosts,
  getUsersPost,
  likeUnlikePost,
} from "../controllers/post.controllers.js";

const router = express.Router();

router.post("/create", restrictedRoute, createPost);
router.post("/edit", restrictedRoute, editPost);
router.post("/like/:postId", restrictedRoute, likeUnlikePost);
router.post("/comment/:postId", restrictedRoute, commentOnPost);
router.post("/:postId", restrictedRoute, deletePost);
router.get("/all", restrictedRoute, getAllPosts);
router.get("/single/:postId", restrictedRoute, getSinglePosts);
router.get("/following", restrictedRoute, getAllFollowingPosts);
router.get("/likes/:userId", restrictedRoute, getLikedPost);
router.get("/user/:username", restrictedRoute, getUsersPost);

export default router;
