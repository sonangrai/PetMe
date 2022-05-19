import { Router } from "express";
import {
  addLikeTask,
  getFeedTask,
  postDeleteTask,
  postFeedTask,
} from "../controller/Feed";
import auth from "../middleware/auth";
import multipart from "connect-multiparty";

let multipartMiddleware = multipart();

const router = Router();

/**
 *get feed
 */
router.get("/", auth, getFeedTask);

/**
 *Post new feed
 */
router.post("/", multipartMiddleware, postFeedTask);

/**
 * Delete Post
 */
router.delete("/:fid", postDeleteTask);

/**
 * Add Like to a Feed
 */
router.post("/like/:fId", auth, addLikeTask);

export default router;
