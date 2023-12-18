"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Feed_1 = require("../controller/Feed");
const auth_1 = __importDefault(require("../middleware/auth"));
const connect_multiparty_1 = __importDefault(require("connect-multiparty"));
let multipartMiddleware = (0, connect_multiparty_1.default)();
const router = (0, express_1.Router)();
/**
 *get feed
 */
router.get("/", auth_1.default, Feed_1.getFeedTask);
/**
 *Post new feed
 */
router.post("/", multipartMiddleware, Feed_1.postFeedTask);
/**
 * Delete Post
 */
router.delete("/:fid", Feed_1.postDeleteTask);
/**
 * Add Like to a Feed
 */
router.post("/like/:fId", auth_1.default, Feed_1.addLikeTask);
exports.default = router;
