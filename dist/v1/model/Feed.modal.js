"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const FeedSchema = new mongoose_1.default.Schema({
    public_id: {
        type: String,
    },
    media: {
        type: Array,
    },
    description: {
        type: String,
    },
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "auth",
    },
    type: {
        type: Number,
    },
    commentCount: {
        type: Number,
    },
    like: {
        type: [],
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Feed", FeedSchema);
