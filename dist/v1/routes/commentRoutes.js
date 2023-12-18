"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Comment_1 = require("../controller/Comment");
let router = (0, express_1.Router)();
/**
 * Post Comment
 */
router.post("/", Comment_1.postCommentTask);
/**
 * Delete comment
 */
router.delete("/:fId/:cId", Comment_1.deleteCommentTask);
exports.default = router;
