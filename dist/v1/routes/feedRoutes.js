"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_multiparty_1 = __importDefault(require("connect-multiparty"));
const express_1 = require("express");
const feed_1 = require("../controller/feed");
const auth_1 = __importDefault(require("../middleware/auth"));
let multipartMiddleware = (0, connect_multiparty_1.default)();
const router = (0, express_1.Router)();
/**
 *get feed
 */
router.get("/", auth_1.default, feed_1.getFeedTask);
/**
 *Post new feed
 */
router.post("/", multipartMiddleware, feed_1.postFeedTask);
/**
 * Delete Post
 */
router.delete("/:fid", auth_1.default, feed_1.deleteFeedTask);
/**
 * Add Like to a Feed
 */
router.post("/like/:fId", auth_1.default, feed_1.likeFeedTask);
exports.default = router;
