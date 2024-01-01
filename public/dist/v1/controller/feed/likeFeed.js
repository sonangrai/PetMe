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
const Feed_modal_1 = __importDefault(require("../../model/Feed.modal"));
const Response_1 = __importDefault(require("../Response"));
/**
 * Add/Remove Likes to a post
 * @param req
 * @param res
 */
const likeFeedTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
exports.default = likeFeedTask;
