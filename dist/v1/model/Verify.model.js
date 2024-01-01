"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const VerifySchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
    },
    secret: {
        type: String,
    },
}, { timestamps: true });
exports.default = mongoose_1.default.model("Verify", VerifySchema);
