import { Router } from "express";
import { deleteCommentTask, postCommentTask } from "../controller/Comment";
import auth from "../middleware/auth";

let router = Router();

/**
 * Post Comment
 */
router.post("/", postCommentTask);

/**
 * Delete comment
 */
router.delete("/:pId/:cId", deleteCommentTask);

export default router;
