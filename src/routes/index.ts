import { Router } from "express";
import authRoutes from "./authRoutes";
import profileRoutes from "./profileRoutes";
import bucketRoutes from "./bucketRoutes";

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

export default router;
