import Comment from "../model/Comment.modal";
import { Response, Request } from "express";
import ResponseObj from "./Response";
import Feed from "../model/Feed.modal";

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

    //Updating the comment count in the post
    let feed = await Feed.findById(feedId);

    if (!feed.commentCount) {
      await Feed.findOneAndUpdate({ _id: feedId }, { commentCount: 1 });
    } else {
      await Feed.findOneAndUpdate(
        { _id: feedId },
        { $inc: { commentCount: 1 } }
      );
    }

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
    let resData = new ResponseObj(400, errorObject, {}, "Comment save failed");
    return res.send(resData);
  }
};

/**
 * Delete Comment
 * @param req
 * @param res
 * @returns
 */
export const deleteCommentTask = async (req: Request, res: Response) => {
  try {
    //Updating the comment count in the post

    await Feed.findOneAndUpdate(
      { _id: req.params.fId },
      { $inc: { commentCount: -1 } }
    );

    await Comment.deleteOne({ _id: req.params.cId }); //Delete the commment

    let respObject = new ResponseObj(200, {}, {}, "Comment Deleted");
    return res.status(200).send(respObject);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(
      400,
      errorObject,
      {},
      "Comment delete failed"
    );
    return res.send(resData);
  }
};
