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
const cloudinary_1 = __importDefault(require("cloudinary"));
const Feed_modal_1 = __importDefault(require("../../model/Feed.modal"));
const Response_1 = __importDefault(require("../Response"));
require("dotenv").config();
//Cloudinary config
cloudinary_1.default.v2.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.apiKey,
    api_secret: process.env.apiSecret,
});
/**
 *
 * @param req
 * @param res
 */
const deleteFeedTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //First getting post information to check the existence
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
exports.default = deleteFeedTask;
