"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authRoutes_1 = __importDefault(require("./authRoutes"));
const bucketRoutes_1 = __importDefault(require("./bucketRoutes"));
const commentRoutes_1 = __importDefault(require("./commentRoutes"));
const feedRoutes_1 = __importDefault(require("./feedRoutes"));
const profileRoutes_1 = __importDefault(require("./profileRoutes"));
const router = (0, express_1.Router)();
/**
 * Authentication routes
 */
router.use("/auth", authRoutes_1.default);
/**
 * Profile routes
 */
router.use("/profile", profileRoutes_1.default);
/**
 * Bucket routes
 */
router.use("/bucket", bucketRoutes_1.default);
/**
 * Feeds routes
 */
router.use("/feed", feedRoutes_1.default);
/**
 * Comment routes
 */
router.use("/comment", commentRoutes_1.default);
exports.default = router;
