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
exports.UploadDP = exports.GetProfile = exports.EditProfileTask = exports.CreateProfileTask = void 0;
const Profile_model_1 = __importDefault(require("../model/Profile.model"));
const Auth_model_1 = __importDefault(require("../model/Auth.model"));
const express_validator_1 = require("express-validator");
const Response_1 = __importDefault(require("./Response"));
const cloudinary_1 = __importDefault(require("cloudinary"));
//Cloudinary config
cloudinary_1.default.v2.config({
    cloud_name: process.env.cloudName,
    api_key: process.env.apiKey,
    api_secret: process.env.apiSecret,
});
/**
 * Creates a profile
 */
const CreateProfileTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstname, lastname, avatar, address, contact } = req.body;
    //Checking the validetion error
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let respObject = new Response_1.default(400, errors, {}, "Validation error occured");
        return res.status(400).send(respObject);
    }
    try {
        let newprofile = new Profile_model_1.default({
            authId: req.user.id,
            firstname: firstname,
            lastname: lastname,
            avatar: avatar,
            address: address,
            contact: contact,
        });
        yield newprofile.save();
        let respObject = new Response_1.default(200, newprofile, {}, "Profile added successfully");
        return res.status(200).send(respObject);
    }
    catch (error) {
        let errorObject = {};
        if (error instanceof Error)
            errorObject = error;
        let resData = new Response_1.default(400, errorObject, {}, "Profile save failed");
        return res.send(resData);
    }
});
exports.CreateProfileTask = CreateProfileTask;
/**
 * Edit a profile
 */
const EditProfileTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { firstname, lastname, avatar, address, contact, bio, gender, dob, hidenumber, } = req.body;
    let profile = new Profile_model_1.default();
    //New pbject for updated fields
    let newProfile = {};
    if (firstname)
        newProfile.firstname = firstname;
    if (lastname)
        newProfile.lastname = lastname;
    if (avatar)
        newProfile.avatar = avatar;
    if (address)
        newProfile.address = address;
    if (contact)
        newProfile.contact = contact;
    if (bio)
        newProfile.bio = bio;
    if (gender)
        newProfile.gender = gender;
    if (dob)
        newProfile.dob = dob;
    if (hidenumber)
        newProfile.hidenumber = hidenumber;
    try {
        let findUser = yield Auth_model_1.default.findById(req.user.id);
        if (!findUser) {
            let respObject = new Response_1.default(400, newProfile, {}, "User not found");
            res.send(respObject);
        }
        else {
            profile = yield Profile_model_1.default.findOneAndUpdate({ authId: req.user.id }, { $set: newProfile }, { new: true });
            let respObject = new Response_1.default(200, profile, {}, "Profile Update Success");
            return res.status(200).send(respObject);
        }
    }
    catch (error) {
        let errorObject = {};
        if (error instanceof Error)
            errorObject = error;
        let resData = new Response_1.default(400, errorObject, {}, "Profile Update Error");
        return res.send(resData);
    }
});
exports.EditProfileTask = EditProfileTask;
/**
 * Fetch the profile
 */
const GetProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //finding if profile exist
    let profile = yield Profile_model_1.default.findOne({ authId: req.user.id });
    if (!profile) {
        let respObject = new Response_1.default(404, {}, {}, "Profile not found");
        return res.status(404).send(respObject);
    }
    let respObject = new Response_1.default(200, profile, {}, "Profile found");
    return res.status(200).send(respObject);
});
exports.GetProfile = GetProfile;
/**
 * Upload DP
 */
const UploadDP = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //Getting image
    const imagedata = req.files.image;
    //Folder
    let location = "petgram/profile";
    /**
     * Finding if the profile is existing
     */
    let findOldDp = yield Profile_model_1.default.findOne({ authId: req.user.id });
    if (!findOldDp) {
        // There is not profile added
        // So we need to insert dp creating the profile object
        let profilewithDP = new Profile_model_1.default();
        //Uploading to Cloudinary
        cloudinary_1.default.v2.uploader.upload(imagedata.path, {
            folder: location,
            use_filename: true,
        }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
            if (result) {
                let imageObjects = {
                    _id: result.public_id,
                    url: result.url,
                    secure_url: result.secure_url,
                    width: result.width,
                    height: result.height,
                };
                profilewithDP.authId = req.user.id; //Setting user id
                profilewithDP.avatar = imageObjects; //Setting the avatar object
                /**
                 * Updating image fields in the profile objects
                 */
                //New pbject for updated fields
                try {
                    yield profilewithDP.save();
                    let respObject = new Response_1.default(200, imageObjects, {}, "DP Added Successfully");
                    return res.status(200).send(respObject);
                }
                catch (error) {
                    let errorObject = {};
                    if (error instanceof Error)
                        errorObject = error;
                    let resData = new Response_1.default(400, errorObject, {}, "Dp Adding Error");
                    return res.status(400).send(resData);
                }
            }
            else {
                let respObject = new Response_1.default(400, {}, {}, "Error Occured while uploading.");
                return res.status(400).send(respObject);
            }
        }));
    }
    else {
        /**
         * Finding if there is older dp to delete it
         */
        if ("avatar" in findOldDp) {
            // Deleting the older profile picture
            cloudinary_1.default.v2.uploader.destroy(findOldDp.avatar._id, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
                if (result) {
                    //Uploading to Cloudinary
                    cloudinary_1.default.v2.uploader.upload(imagedata.path, {
                        folder: location,
                        use_filename: true,
                    }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
                        if (result) {
                            let imageObjects = {
                                _id: result.public_id,
                                url: result.url,
                                secure_url: result.secure_url,
                                width: result.width,
                                height: result.height,
                            };
                            /**
                             * Updating image fields in the profile objects
                             */
                            //New pbject for updated fields
                            try {
                                yield Profile_model_1.default.findOneAndUpdate({ authId: req.user.id }, { $set: { avatar: imageObjects } }, { new: true });
                                let respObject = new Response_1.default(200, imageObjects, {}, "DP Update Success");
                                return res.status(200).send(respObject);
                            }
                            catch (error) {
                                let errorObject = {};
                                if (error instanceof Error)
                                    errorObject = error;
                                let resData = new Response_1.default(400, errorObject, {}, "Profile Update Error");
                                return res.send(resData);
                            }
                        }
                        else {
                            let respObject = new Response_1.default(400, {}, {}, "Error Occured while uploading.");
                            return res.status(400).send(respObject);
                        }
                    }));
                }
                else {
                    let respObject = new Response_1.default(400, error, {}, "Image Delete Failed");
                    return res.status(400).send(respObject);
                }
            }));
        }
        else {
            //Checking files is send or not
            if (!imagedata) {
                let respObject = new Response_1.default(405, {}, {}, "PLease send Image");
                return res.status(405).send(respObject);
            }
            //Uploading to Cloudinary
            cloudinary_1.default.v2.uploader.upload(imagedata.path, {
                folder: location,
                use_filename: true,
            }, (error, result) => __awaiter(void 0, void 0, void 0, function* () {
                if (result) {
                    let imageObjects = {
                        _id: result.public_id,
                        url: result.url,
                        secure_url: result.secure_url,
                        width: result.width,
                        height: result.height,
                    };
                    /**
                     * Updating image fields in the profile objects
                     */
                    //New pbject for updated fields
                    try {
                        yield Profile_model_1.default.findOneAndUpdate({ _id: req.user.id }, { $set: { avatar: imageObjects } }, { new: true });
                        let respObject = new Response_1.default(200, imageObjects, {}, "DP Update Success");
                        return res.status(200).send(respObject);
                    }
                    catch (error) {
                        let errorObject = {};
                        if (error instanceof Error)
                            errorObject = error;
                        let resData = new Response_1.default(400, errorObject, {}, "Profile Update Error");
                        return res.send(resData);
                    }
                }
                else {
                    let respObject = new Response_1.default(400, {}, {}, "Error Occured while uploading.");
                    return res.status(400).send(respObject);
                }
            }));
        }
    }
});
exports.UploadDP = UploadDP;
