"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const comment_1 = require("../controller/comment");
let router = (0, express_1.Router)();
/**
 * Post Comment
 */
router.post("/", comment_1.postCommentTask);
/**
 * Delete comment
 */
router.delete("/:fId/:cId", comment_1.deleteCommentTask);
exports.default = router;
