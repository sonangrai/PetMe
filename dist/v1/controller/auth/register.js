"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Auth_model_1 = __importDefault(require("v1/model/Auth.model"));
const Response_1 = __importDefault(require("../Response"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_validator_1 = require("express-validator");
/**
 * This task is for registering a new user
 * @returns
 */
const RegisterUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, username, password } = req.body;
    //Checking validations
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let respObject = new Response_1.default(400, errors, {}, "Validations error occurred");
        return res.status(400).send(respObject);
    }
    /**
     * Checking if the email is already existing
     */
    let found = yield Auth_model_1.default.findOne({ email });
    if (found) {
        let resData = new Response_1.default(409, {}, {}, "Email already Taken");
        return res.status(409).send(resData);
    }
    /**
     * Creating the new user object with the body request
     */
    let newUser = new Auth_model_1.default();
    newUser.email = email;
    newUser.username = username;
    /**
     * Generating salt
     */
    let salt = yield bcryptjs_1.default.genSalt(10);
    //Hashing the password
    newUser.password = yield bcryptjs_1.default.hash(password, salt);
    /**
     * Generating token for the activation link
     */
    let token = jsonwebtoken_1.default.sign({ expiresIn: 360000 }, process.env.mySecret);
    /**
     * Saving to database
     */
    try {
        yield newUser.save();
        let resData = new Response_1.default(200, newUser, {}, "Confirm link is sent to mail");
        //SendActivationMail(newUser._id, token, newUser.email);
        return res.send(resData);
    }
    catch (error) {
        let errorObject = {};
        if (error instanceof Error)
            errorObject = error;
        let resData = new Response_1.default(400, errorObject, {}, "User save failed");
        return res.send(resData);
    }
});
exports.default = RegisterUser;
