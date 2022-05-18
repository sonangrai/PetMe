import Comment from "../model/Comment.modal";
import { Response, Request } from "express";

/**
 * Post New Comment
 * @param req
 * @param res
 */
export const postCommentTask = async (req: Request, res: Response) => {
  try {
    const { comment, replyTo } = req.body;
    res.send(comment);
  } catch (error) {}
};
