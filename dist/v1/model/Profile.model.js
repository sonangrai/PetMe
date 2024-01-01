"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProfileSchema = new mongoose_1.default.Schema({
    authId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "auth",
    },
    firstname: {
        type: String,
    },
    lastname: {
        type: String,
    },
    avatar: {
        type: Object,
    },
    bio: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: Date,
    },
    address: {
        type: String,
    },
    contact: {
        type: String,
    },
    hidenumber: {
        type: String,
        default: 0, // 0 for hide & 1 for show
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Profile", ProfileSchema);
