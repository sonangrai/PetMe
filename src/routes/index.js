import { Router } from "express";
import authRoutes from "./authRoutes";
import profileRoutes from "./profileRoutes";

const router = Router();

/**
 * Authentication routes
 */
router.use("/auth", authRoutes);

/**
 * Profile routes
 */
router.use("/profile", profileRoutes);

export default router;
