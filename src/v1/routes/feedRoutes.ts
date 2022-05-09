import { Router } from "express";
import { getFeedTask, postFeedTask } from "../controller/Feed";
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

export default router;
