import { Router } from "express";
import { check } from "express-validator";
import {
  CreateProfileTask,
  EditProfileTask,
  GetProfile,
} from "../controller/Profile";
import auth from "../middleware/auth";

let router = Router();

/**
 * Create profile route
 */
router.post(
  "/",
  [
    check("firstname")
      .notEmpty()
      .withMessage("This is a required field")
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("This must be a string"),
    check("lastname")
      .notEmpty()
      .withMessage("This is a required field")
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("This must be a string"),
    check("address").notEmpty().withMessage("This is a required field"),
    check("contact")
      .notEmpty()
      .withMessage("This is a required field")
      .matches(/^\d{10}$/)
      .withMessage("This must be a valid number"),
  ],
  auth,
  CreateProfileTask
);

/**
 * Create profile route
 */
router.put(
  "/",
  [
    check("firstname")
      .notEmpty()
      .withMessage("This is a required field")
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("This must be a string"),
    check("lastname")
      .notEmpty()
      .withMessage("This is a required field")
      .matches(/^[A-Za-z\s]+$/)
      .withMessage("This must be a string"),
    check("address").notEmpty().withMessage("This is a required field"),
    check("contact")
      .notEmpty()
      .withMessage("This is a required field")
      .matches(/^\d{10}$/)
      .withMessage("This must be a valid number"),
  ],
  auth,
  EditProfileTask
);

/**
 * Get profile
 */
router.get("/", auth, GetProfile);

export default router;
