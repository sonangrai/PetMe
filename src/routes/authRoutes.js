import { Router } from "express";
import { RegisterTask } from "../controller/Auth";
import { check } from "express-validator";

const router = Router();

router.get(
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

export default router;
