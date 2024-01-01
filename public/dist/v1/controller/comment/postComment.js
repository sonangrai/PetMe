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
const Comment_modal_1 = __importDefault(require("../../model/Comment.modal"));
const Feed_modal_1 = __importDefault(require("../../model/Feed.modal"));
const Response_1 = __importDefault(require("../Response"));
/**
 * Post New Comment
 * @param req
 * @param res
 */
const postCommentTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { commentText, feedId, id, replyTo } = req.body;
        let newComment = new Comment_modal_1.default({
            feedId,
            id,
            commentText,
            replyTo,
        });
        yield newComment.save();
        //Updating the comment count in the post
        let feed = yield Feed_modal_1.default.findById(feedId);
        if (!feed.commentCount) {
            yield Feed_modal_1.default.findOneAndUpdate({ _id: feedId }, { commentCount: 1 });
        }
        else {
            yield Feed_modal_1.default.findOneAndUpdate({ _id: feedId }, { $inc: { commentCount: 1 } });
        }
        let respObject = new Response_1.default(200, newComment, {}, "Comment added successfully");
        return res.status(200).send(respObject);
    }
    catch (error) {
        console.log(error);
        let errorObject = {};
        if (error instanceof Error)
            errorObject = error;
        let responseObj = new Response_1.default(500, errorObject, {}, "Server Error");
        return res.status(500).send(responseObj);
    }
});
exports.default = postCommentTask;
