import { Request, Response } from "express";
import Comment from "../../model/Comment.modal";
import Feed from "../../model/Feed.modal";
import ResponseObj from "../Response";

/**
 * Post New Comment
 * @param req
 * @param res
 */
const postCommentTask = async (req: Request, res: Response) => {
  try {
    const { commentText, feedId, id, replyTo } = req.body;
    let newComment = new Comment({
      feedId,
      id,
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
    console.log(error);
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let responseObj = new ResponseObj(500, errorObject, {}, "Server Error");
    return res.status(500).send(responseObj);
  }
};

export default postCommentTask;
