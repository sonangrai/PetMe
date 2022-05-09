import { Router } from "express";
import { getFeedTask } from "../controller/Feed";
import auth from "../middleware/auth";

const router = Router();

/**
 *
 */
router.get("/", auth, getFeedTask);

export default router;
