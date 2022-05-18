import Comment from "../model/Comment.modal";
import { Response, Request } from "express";
import ResponseObj from "./Response";

/**
 * Post New Comment
 * @param req
 * @param res
 */
export const postCommentTask = async (req: Request, res: Response) => {
  try {
    const { commentText, feedId, commentorId, replyTo } = req.body;
    let newComment = new Comment({
      feedId,
      commentorId,
      commentText,
      replyTo,
    });
    await newComment.save();

    let respObject = new ResponseObj(
      200,
      newComment,
      {},
      "Comment added successfully"
    );
    return res.status(200).send(respObject);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(400, errorObject, {}, "Post save failed");
    return res.send(resData);
  }
};
