"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Bucket_1 = require("../controller/Bucket");
const connect_multiparty_1 = __importDefault(require("connect-multiparty"));
let multipartMiddleware = (0, connect_multiparty_1.default)();
let router = (0, express_1.default)();
/**
 * Upload images
 */
router.post("/", multipartMiddleware, Bucket_1.uploadTask);
/**
 * Delete image
 */
router.delete("/", Bucket_1.deleteImg);
exports.default = router;
