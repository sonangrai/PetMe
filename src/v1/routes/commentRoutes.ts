import { Router } from "express";
import { deleteCommentTask, postCommentTask } from "../controller/comment";

let router = Router();

/**
 * Post Comment
 */
router.post("/", postCommentTask);

/**
 * Delete comment
 */
router.delete("/:fId/:cId", deleteCommentTask);

export default router;
