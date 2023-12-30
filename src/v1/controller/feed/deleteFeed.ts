import cloudinary from "cloudinary";
import { Request, Response } from "express";
import Feed from "../../model/Feed.modal";
import ResponseObj from "../Response";
require("dotenv").config();

//Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});

/**
 *
 * @param req
 * @param res
 */
const deleteFeedTask = async (req: Request, res: Response) => {
  try {
    //First getting post information to check the existence
    const postObject = await Feed.findById(req.params.fid);
    if (!postObject) {
      let respObject = new ResponseObj(404, {}, {}, "Post not found");
      return res.status(404).send(respObject);
    }

    //Deleting the image from cloudinary before deleting the post
    let multiplePicturePromise = postObject.media.map(
      (element) =>
        new Promise((resolve, reject) => {
          //Uploading to Cloudinary
          cloudinary.v2.uploader.destroy(
            element.public_id,
            function (error, result) {
              if (error) {
                reject(error);
              } else {
                resolve("Image deleted");
              }
            }
          );
        })
    );
    let imageResponses = await Promise.all(multiplePicturePromise);

    await Feed.deleteOne({ _id: req.params.fid });

    let respObject = new ResponseObj(
      200,
      { imageResponses },
      {},
      "Post deleted successfully"
    );
    return res.status(200).send(respObject);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(500, errorObject, {}, "Post delete failed");
    return res.send(resData);
  }
};

export default deleteFeedTask;
