import multipart from "connect-multiparty";
import { Router } from "express";
import {
  deleteFeedTask,
  getFeedTask,
  likeFeedTask,
  postFeedTask,
} from "../controller/feed";
import auth from "../middleware/auth";

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
router.delete("/:fid", auth, deleteFeedTask);

/**
 * Add Like to a Feed
 */
router.post("/like/:fId", auth, likeFeedTask);

export default router;
