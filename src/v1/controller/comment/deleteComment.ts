import { Request, Response } from "express";
import Comment from "../../model/Comment.modal";
import Feed from "../../model/Feed.modal";
import ResponseObj from "../Response";

/**
 * Delete Comment
 * @param req
 * @param res
 * @returns
 */
const deleteCommentTask = async (req: Request, res: Response) => {
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

export default deleteCommentTask;
