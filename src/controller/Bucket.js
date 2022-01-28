import cloudinary from "cloudinary";
import ResponseObj from "./Response";
require("dotenv").config();

//Cloudinary config
cloudinary.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});

/**
 * Upload profile images
 * @param {*} req
 * @param {*} res
 */
export const uploadTask = async (req, res) => {
  //Getting image
  const imagedata = req.files.image;

  //Uploading to Cloudinary
  cloudinary.uploader.upload(
    imagedata.path,
    async (result, error) => {
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
          "Profile Image upload Success"
        );

        console.log(respObject);
        return res.status(200).send(respObject);
      } else {
        let respObject = new ResponseObj(
          400,
          {},
          "Error Occured while uploading."
        );
        return res.statu(400).send(respObject);
      }
    },
    {
      folder: "petgram/profile",
      use_filename: true,
    }
  );
};

/**
 * Remove DP
 */
export const deleteImg = async (req, res) => {
  let { publicid } = req.body;

  cloudinary.uploader.destroy(publicid, async (result, error) => {
    if (result) {
      let respObject = new ResponseObj(200, result, "Image Deleted");
      return res.status(200).send(respObject);
    } else {
      let respObject = new ResponseObj(400, error, "Image Delete Failed");
      return res.status(400).send(respObject);
    }
  });
};
