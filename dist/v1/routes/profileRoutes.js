"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const Profile_1 = require("../controller/Profile");
const auth_1 = __importDefault(require("../middleware/auth"));
const connect_multiparty_1 = __importDefault(require("connect-multiparty"));
let multipartMiddleware = (0, connect_multiparty_1.default)();
let router = (0, express_1.Router)();
/**
 * Create profile route
 */
router.post("/", [
    (0, express_validator_1.check)("firstname")
        .notEmpty()
        .withMessage("This is a required field")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("This must be a string"),
    (0, express_validator_1.check)("lastname")
        .notEmpty()
        .withMessage("This is a required field")
        .matches(/^[A-Za-z\s]+$/)
        .withMessage("This must be a string"),
    (0, express_validator_1.check)("address").notEmpty().withMessage("This is a required field"),
    (0, express_validator_1.check)("contact")
        .notEmpty()
        .withMessage("This is a required field")
        .matches(/^\d{10}$/)
        .withMessage("This must be a valid number"),
], auth_1.default, Profile_1.CreateProfileTask);
/**
 * Create profile route
 */
router.put("/", auth_1.default, Profile_1.EditProfileTask);
/**
 * Get profile
 */
router.get("/", auth_1.default, Profile_1.GetProfile);
/**
 * Upload DP
 */
router.post("/dp", [auth_1.default, multipartMiddleware], Profile_1.UploadDP);
exports.default = router;
