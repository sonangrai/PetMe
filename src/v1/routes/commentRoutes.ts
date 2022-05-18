import { Router } from "express";
import { postCommentTask } from "../controller/Comment";
import auth from "../middleware/auth";

let router = Router();

/**
 * Upload images
 */
router.post("/", postCommentTask);

export default router;
