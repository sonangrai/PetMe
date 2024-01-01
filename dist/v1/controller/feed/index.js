"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postFeedTask = exports.likeFeedTask = exports.getFeedTask = exports.deleteFeedTask = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
require("dotenv").config();
const deleteFeed_1 = __importDefault(require("./deleteFeed"));
exports.deleteFeedTask = deleteFeed_1.default;
const getFeed_1 = __importDefault(require("./getFeed"));
exports.getFeedTask = getFeed_1.default;
const likeFeed_1 = __importDefault(require("./likeFeed"));
exports.likeFeedTask = likeFeed_1.default;
const postFeed_1 = __importDefault(require("./postFeed"));
exports.postFeedTask = postFeed_1.default;
//Cloudinary config
cloudinary_1.default.v2.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.apiKey,
    api_secret: process.env.apiSecret,
});
