import cloudinary from "cloudinary";
import { Request, Response } from "express";
import Feed from "../../model/Feed.modal";
import ResponseObj from "../Response";

//Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});

/**
 * Post New Feed
 * @param req
 * @param res
 */
const postFeedTask = async (req: Request, res: Response) => {
  try {
    const { description, userId, type } = req.body;

    let newFeed = new Feed({
      description,
      userId,
      type,
      media: [],
    });

    let medias = req.files.media;

    //Uploading all the media images to cloudinary
    let multiplePicturePromise = medias.map(
      (element) =>
        new Promise((resolve, reject) => {
          //Uploading to Cloudinary
          cloudinary.v2.uploader.upload(
            element.path,
            {
              folder: "petgram/post",
              use_filename: true,
            },
            function (error, result) {
              if (error) {
                reject(error);
              } else {
                let media = {
                  public_id: result.public_id,
                  url: result.url,
                  secure_url: result.secure_url,
                  width: result.width,
                  height: result.height,
                };
                resolve(media);
              }
            }
          );
        })
    );
    let imageResponses = await Promise.all(multiplePicturePromise);

    newFeed.media = imageResponses;

    //Saving the feeds info
    await newFeed.save();
    let respObject = new ResponseObj(
      200,
      newFeed,
      {},
      "Post added successfully"
    );
    return res.status(200).send(respObject);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(400, errorObject, {}, "Post save failed");
    return res.send(resData);
  }
};

export default postFeedTask;
