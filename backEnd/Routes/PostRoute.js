import express from "express";
import {
  createPost,
  delPost,
  editPost,
  getPost,
  getTimelinePosts,
  likePost,
} from "../Controllers/PostController.js";

const router = express.Router();

router.post("/", createPost);
router.get("/:id", getPost);
router.patch("/:id", editPost);
router.delete("/:id", delPost);
router.patch("/:id/likedislike", likePost);
router.get("/:id/timeline", getTimelinePosts);

export default router;
