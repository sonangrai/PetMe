import Router from "express";
import { deleteImg, uploadTask } from "../controller/Bucket";
import multipart from "connect-multiparty";

let multipartMiddleware = multipart();
let router = Router();

/**
 * Upload images
 */
router.post("/", multipartMiddleware, uploadTask);

/**
 * Delete image
 */
router.delete("/", deleteImg);

export default router;
