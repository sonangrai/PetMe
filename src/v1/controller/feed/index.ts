import cloudinary from "cloudinary";
require("dotenv").config();

import deleteFeedTask from "./deleteFeed";
import getFeedTask from "./getFeed";
import likeFeedTask from "./likeFeed";
import postFeedTask from "./postFeed";

//Cloudinary config
cloudinary.v2.config({
  cloud_name: process.env.cloudName,
  api_key: process.env.apiKey,
  api_secret: process.env.apiSecret,
});

export { deleteFeedTask, getFeedTask, likeFeedTask, postFeedTask };
