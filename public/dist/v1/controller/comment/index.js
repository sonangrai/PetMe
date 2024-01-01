"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postCommentTask = exports.deleteCommentTask = void 0;
const deleteComment_1 = __importDefault(require("./deleteComment"));
exports.deleteCommentTask = deleteComment_1.default;
const postComment_1 = __importDefault(require("./postComment"));
exports.postCommentTask = postComment_1.default;
