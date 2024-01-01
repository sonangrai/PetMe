"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const auth_1 = require("../controller/auth");
const router = (0, express_1.Router)();
/**
 * Register route
 */
router.post("/", [
    (0, express_validator_1.check)("email", "This must be a valid email address.").isEmail(),
    (0, express_validator_1.check)("username", "Please enter the username").notEmpty(),
    (0, express_validator_1.check)("password", "Password must be more than 6 character").isLength({
        min: 6,
    }),
], auth_1.RegisterUser);
/**
 * Login route
 */
router.post("/login", [
    (0, express_validator_1.check)("authType", "This cannot be empty").notEmpty(),
    (0, express_validator_1.check)("password", "This cannot be empty").notEmpty(),
], auth_1.LoginUser);
/**
 * Activate account route
 */
router.post("/activate", auth_1.ActivateAccount);
exports.default = router;
