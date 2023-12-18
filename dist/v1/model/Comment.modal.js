"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const CommentSchema = new mongoose_1.default.Schema({
    feedId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "feed",
    },
    commentorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "auth",
    },
    commentText: {
        type: String,
    },
    replyTo: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "comment",
    },
    like: {
        type: Array,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Comment", CommentSchema);
