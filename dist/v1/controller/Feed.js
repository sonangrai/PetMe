"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addLikeTask = exports.postDeleteTask = exports.postFeedTask = exports.getFeedTask = void 0;
const Feed_modal_1 = __importDefault(require("../model/Feed.modal"));
const Response_1 = __importDefault(require("./Response"));
const respPagination_1 = __importDefault(require("./respPagination"));
const cloudinary_1 = __importDefault(require("cloudinary"));
require("dotenv").config();
//Cloudinary config
cloudinary_1.default.v2.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.apiKey,
    api_secret: process.env.apiSecret,
});
/**
 * Get all feeds
 * @param req
 * @param res
 */
const getFeedTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feeds = yield Feed_modal_1.default.find();
        if (Object(feeds).length === 0) {
            const paginate = new respPagination_1.default(0, 0, 0);
            const responseObj = new Response_1.default(200, {}, paginate, "No Data");
            return res.status(200).send(responseObj);
        }
        const paginate = new respPagination_1.default(0, 0, 0);
        const responseObj = new Response_1.default(200, feeds, paginate, "Data");
        return res.status(200).send(responseObj);
    }
    catch (error) {
        let errorObject = {};
        if (error instanceof Error)
            errorObject = error;
        let resData = new Response_1.default(500, errorObject, {}, "Something went wrong");
        return res.send(resData);
    }
});
exports.getFeedTask = getFeedTask;
/**
 * Post New Feed
 * @param req
 * @param res
 */
const postFeedTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { description, userId, type } = req.body;
        let newFeed = new Feed_modal_1.default({
            description,
            userId,
            type,
            media: [],
        });
        let medias = req.files.media;
        //Uploading all the media images to cloudinary
        let multiplePicturePromise = medias.map((element) => new Promise((resolve, reject) => {
            //Uploading to Cloudinary
            cloudinary_1.default.v2.uploader.upload(element.path, {
                folder: "petgram/post",
                use_filename: true,
            }, function (error, result) {
                if (error) {
                    reject(error);
                }
                else {
                    let media = {
                        public_id: result.public_id,
                        url: result.url,
                        secure_url: result.secure_url,
                        width: result.width,
                        height: result.height,
                    };
                    resolve(media);
                }
            });
        }));
        let imageResponses = yield Promise.all(multiplePicturePromise);
        newFeed.media = imageResponses;
        //Saving the feeds info
        yield newFeed.save();
        let respObject = new Response_1.default(200, newFeed, {}, "Post added successfully");
        return res.status(200).send(respObject);
    }
    catch (error) {
        let errorObject = {};
        if (error instanceof Error)
            errorObject = error;
        let resData = new Response_1.default(400, errorObject, {}, "Post save failed");
        return res.send(resData);
    }
});
exports.postFeedTask = postFeedTask;
/**
 *
 * @param req
 * @param res
 */
const postDeleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //First getting post information to check the existance
        const postObject = yield Feed_modal_1.default.findById(req.params.fid);
        if (!postObject) {
            let respObject = new Response_1.default(404, {}, {}, "Post not found");
            return res.status(404).send(respObject);
        }
        //Deleting the image from cloudinary before deleting the post
        let multiplePicturePromise = postObject.media.map((element) => new Promise((resolve, reject) => {
            //Uploading to Cloudinary
            cloudinary_1.default.v2.uploader.destroy(element.public_id, function (error, result) {
                if (error) {
                    reject(error);
                }
                else {
                    resolve("Image deleted");
                }
            });
        }));
        let imageResponses = yield Promise.all(multiplePicturePromise);
        yield Feed_modal_1.default.deleteOne({ _id: req.params.fid });
        let respObject = new Response_1.default(200, { imageResponses }, {}, "Post deleted successfully");
        return res.status(200).send(respObject);
    }
    catch (error) {
        let errorObject = {};
        if (error instanceof Error)
            errorObject = error;
        let resData = new Response_1.default(500, errorObject, {}, "Post delete failed");
        return res.send(resData);
    }
});
exports.postDeleteTask = postDeleteTask;
/**
 * Add/Remove Likes to a post
 * @param req
 * @param res
 */
const addLikeTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Checking if already liked
        let feed = yield Feed_modal_1.default.findById(req.params.fId);
        if (feed.like.includes(req.user.id)) {
            let newFeed = yield Feed_modal_1.default.findOneAndUpdate({ _id: req.params.fId }, { $pull: { like: req.user.id } }, { new: true });
            let respObj = new Response_1.default(200, newFeed, {}, "Liked");
            return res.status(200).send(respObj);
        }
        //If not liked than we like it
        let newFeed = yield Feed_modal_1.default.findOneAndUpdate({ _id: req.params.fId }, { $push: { like: req.user.id } }, { new: true });
        let respObj = new Response_1.default(200, newFeed, {}, "Liked");
        return res.status(200).send(respObj);
    }
    catch (error) {
        let errorObject = {};
        if (error instanceof Error)
            errorObject = error;
        let resData = new Response_1.default(400, errorObject, {}, "Server failed");
        return res.send(resData);
    }
});
exports.addLikeTask = addLikeTask;
