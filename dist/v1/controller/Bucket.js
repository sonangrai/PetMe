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
exports.deleteImg = exports.uploadTask = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
const Response_1 = __importDefault(require("./Response"));
require("dotenv").config();
//Cloudinary config
cloudinary_1.default.v2.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.apiKey,
    api_secret: process.env.apiSecret,
});
//Folder
let location = "petgram/profile";
/**
 * Upload profile images
 * @param {*} req
 * @param {*} res
 */
const uploadTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Getting image
    const imagedata = req.files.image;
    //Uploading to Cloudinary
    cloudinary_1.default.v2.uploader.upload(imagedata.path, {
        folder: location,
        use_filename: true,
    }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
        if (result) {
            let respObject = new Response_1.default(200, {
                _id: result.public_id,
                url: result.url,
                secure_url: result.secure_url,
                width: result.width,
                height: result.height,
            }, {}, "Profile Image upload Success");
            return res.status(200).send(respObject);
        }
        else {
            let respObject = new Response_1.default(400, {}, {}, "Error Occured while uploading.");
            return res.status(400).send(respObject);
        }
    }));
});
exports.uploadTask = uploadTask;
/**
 * Remove DP
 */
const deleteImg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { publicid } = req.body;
    cloudinary_1.default.v2.uploader.destroy(publicid, (result, error) => __awaiter(void 0, void 0, void 0, function* () {
        if (result) {
            let respObject = new Response_1.default(200, result, {}, "Image Deleted");
            return res.status(200).send(respObject);
        }
        else {
            let respObject = new Response_1.default(400, error, {}, "Image Delete Failed");
            return res.status(400).send(respObject);
        }
    }));
});
exports.deleteImg = deleteImg;
