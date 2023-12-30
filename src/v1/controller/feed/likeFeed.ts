import { Request, Response } from "express";
import Feed from "../../model/Feed.modal";
import ResponseObj from "../Response";

/**
 * Add/Remove Likes to a post
 * @param req
 * @param res
 */
const likeFeedTask = async (req: Request, res: Response) => {
  try {
    //Checking if already liked
    let feed = await Feed.findById(req.params.fId);
    if (feed.like.includes(req.user.id)) {
      let newFeed = await Feed.findOneAndUpdate(
        { _id: req.params.fId },
        { $pull: { like: req.user.id } },
        { new: true }
      );

      let respObj = new ResponseObj(200, newFeed, {}, "Liked");
      return res.status(200).send(respObj);
    }

    //If not liked than we like it
    let newFeed = await Feed.findOneAndUpdate(
      { _id: req.params.fId },
      { $push: { like: req.user.id } },
      { new: true }
    );
    let respObj = new ResponseObj(200, newFeed, {}, "Liked");
    return res.status(200).send(respObj);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(400, errorObject, {}, "Server failed");
    return res.send(resData);
  }
};

export default likeFeedTask;
