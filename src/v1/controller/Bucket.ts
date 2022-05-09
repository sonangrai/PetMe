import cloudinary from "cloudinary";
import ResponseObj from "./Response";
import { Response, Request } from "express";
require("dotenv").config();

//User
declare global {
  namespace Express {
    export interface Request {
      files?: any;
    }
  }
}

//Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});

//Folder
let location: string = "petgram/profile";

/**
 * Upload profile images
 * @param {*} req
 * @param {*} res
 */
export const uploadTask = async (req: Request, res: Response) => {
  //Getting image
  const imagedata = req.files.image;

  //Uploading to Cloudinary
  cloudinary.v2.uploader.upload(
    imagedata.path,
    {
      folder: location,
      use_filename: true,
    },
    async (error: any, result: any) => {
      if (result) {
        let respObject = new ResponseObj(
          200,
          {
            _id: result.public_id,
            url: result.url,
            secure_url: result.secure_url,
            width: result.width,
            height: result.height,
          },
          {},
          "Profile Image upload Success"
        );
        return res.status(200).send(respObject);
      } else {
        let respObject = new ResponseObj(
          400,
          {},
          {},
          "Error Occured while uploading."
        );
        return res.status(400).send(respObject);
      }
    }
  );
};

/**
 * Remove DP
 */
export const deleteImg = async (req: Request, res: Response) => {
  let { publicid } = req.body;

  cloudinary.v2.uploader.destroy(publicid, async (result: any, error: any) => {
    if (result) {
      let respObject = new ResponseObj(200, result, {}, "Image Deleted");
      return res.status(200).send(respObject);
    } else {
      let respObject = new ResponseObj(400, error, {}, "Image Delete Failed");
      return res.status(400).send(respObject);
    }
  });
};
