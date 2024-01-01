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
//Cloudinary config
cloudinary_1.default.v2.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.apiKey,
    api_secret: process.env.apiSecret,
});
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
exports.default = postFeedTask;
