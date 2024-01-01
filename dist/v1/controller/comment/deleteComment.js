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
 * Delete Comment
 * @param req
 * @param res
 * @returns
 */
const deleteCommentTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //Updating the comment count in the post
        yield Feed_modal_1.default.findOneAndUpdate({ _id: req.params.fId }, { $inc: { commentCount: -1 } });
        yield Comment_modal_1.default.deleteOne({ _id: req.params.cId }); //Delete the commment
        let respObject = new Response_1.default(200, {}, {}, "Comment Deleted");
        return res.status(200).send(respObject);
    }
    catch (error) {
        let errorObject = {};
        if (error instanceof Error)
            errorObject = error;
        let resData = new Response_1.default(400, errorObject, {}, "Comment delete failed");
        return res.send(resData);
    }
});
exports.default = deleteCommentTask;
