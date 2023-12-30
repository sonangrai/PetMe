import { Router } from "express";
import { check } from "express-validator";
import { ActivateAccount, LoginUser, RegisterUser } from "../controller/auth";

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
  RegisterUser
);

/**
 * Login route
 */
router.post(
  "/login",
  [
    check("authType", "This cannot be empty").notEmpty(),
    check("password", "This cannot be empty").notEmpty(),
  ],
  LoginUser
);

/**
 * Activate account route
 */
router.post("/activate", ActivateAccount);

export default router;
