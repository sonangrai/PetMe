import { Request, Response } from "express";
import Feed from "../model/Feed.modal";
import ResponseObj from "./Response";
import respPagination from "./respPagination";
import cloudinary from "cloudinary";
require("dotenv").config();

//Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});

/**
 * Get all feeds
 * @param req
 * @param res
 */
export const getFeedTask = async (req: Request, res: Response) => {
  try {
    const feeds = await Feed.find();
    if (Object(feeds).length === 0) {
      const paginate = new respPagination(0, 0, 0);
      const responseObj = new ResponseObj(200, {}, paginate, "No Data");
      return res.status(200).send(responseObj);
    }
    return res.send(feeds);
  } catch (error) {
    let errorObject: object = {};
    if (error instanceof Error) errorObject = error;
    let resData = new ResponseObj(500, errorObject, {}, "Something went wrong");
    return res.send(resData);
  }
};

/**
 * Post New Feed
 * @param req
 * @param res
 */
export const postFeedTask = async (req: Request, res: Response) => {
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

/**
 *
 * @param req
 * @param res
 */
export const postDeleteTask = async (req: Request, res: Response) => {
  try {
    //First getting post information to check the existance
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
