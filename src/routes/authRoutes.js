import { Router } from "express";
import { LoginTask, RegisterTask } from "../controller/Auth";
import { check } from "express-validator";

const router = Router();

/**
 * Register route
 */
router.post(
  "/",
  [
    check("email", "This must be a valid email address.").isEmail(),
    check("username", "Please enter the username").notEmpty(),
    check("password", "Password must be more than 6 character").isLength({
      min: 6,
    }),
  ],
  RegisterTask
);

/**
 * Login route
 */
router.post(
  "/login",
  [
    check("logtype", "This cannot be empty").notEmpty(),
    check("password", "This cannot be empty").notEmpty(),
  ],
  LoginTask
);

export default router;
