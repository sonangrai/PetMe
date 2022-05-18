import { Router } from "express";
import authRoutes from "./authRoutes";
import profileRoutes from "./profileRoutes";
import bucketRoutes from "./bucketRoutes";
import feedRoutes from "./feedRoutes";
import commentRoutes from "./commentRoutes";

const router = Router();

/**
 * Authentication routes
 */
router.use("/auth", authRoutes);

/**
 * Profile routes
 */
router.use("/profile", profileRoutes);

/**
 * Bucket routes
 */
router.use("/bucket", bucketRoutes);

/**
 * Feeds routes
 */
router.use("/feed", feedRoutes);

/**
 * Comment routes
 */
router.use("/comment", commentRoutes);

export default router;
