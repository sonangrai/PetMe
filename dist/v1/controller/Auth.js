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
exports.LoginTask = exports.ActivateTask = exports.SendActivationMail = exports.RegisterTask = void 0;
const Auth_model_1 = __importDefault(require("../model/Auth.model"));
const Response_1 = __importDefault(require("./Response"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const express_validator_1 = require("express-validator");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
/**
 * This task is for registering a new user
 * @returns
 */
const RegisterTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let { email, username, password } = req.body;
    //Checking validations
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let respObject = new Response_1.default(400, errors, {}, "Validations error occured");
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
exports.RegisterTask = RegisterTask;
/**
 * Create activate token and save to mongodb
 */
const SendActivationMail = (id, token, email) => __awaiter(void 0, void 0, void 0, function* () {
    let transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        auth: {
            user: "shonahangrae@gmail.com",
            pass: process.env.myPass,
        },
    });
    let info = yield transporter.sendMail({
        from: '"Fred Foo 👻" <foo@example.com>',
        to: email,
        subject: "Password Reset Request",
        text: "Forgot Your Password",
        html: `<p>CLick here to change your password <a href="/api/resetpassword/${id}/${token}">Reset password</a> </p>`, // html body
    });
    //console.log("Message sent: %s", info.messageId);
});
exports.SendActivationMail = SendActivationMail;
/**
 * The activate account task
 */
const ActivateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, code } = req.body;
    //Checking code for now 1234
    if (code !== "1234") {
        let respObject = new Response_1.default(401, {}, {}, "Sorry, but the code is not valid");
        return res.status(401).send(respObject);
    }
    /**
     * Finding the user
     */
    try {
        let findUser = yield Auth_model_1.default.findOne({ email: email });
        if (!findUser) {
            let responseObj = new Response_1.default(404, {}, {}, "Sorry, The user was not found. Please chefck again.");
            return res.status(404).send(responseObj);
        }
        yield Auth_model_1.default.findOneAndUpdate({ _id: findUser._id }, { status: 1 }, { new: true });
        let respObject = new Response_1.default(200, {}, {}, "Congrats, your account is now activated. Now you can log in.");
        return res.status(200).send(respObject);
    }
    catch (error) {
        let errorObject = {};
        if (error instanceof Error)
            errorObject = error;
        let responseObj = new Response_1.default(500, errorObject, {}, "Server Error");
        return res.status(500).send(responseObj);
    }
});
exports.ActivateTask = ActivateTask;
/**
 * The login task
 */
const LoginTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { logtype, password } = req.body;
    //Checking validations
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let respObject = new Response_1.default(400, errors, {}, "Validations error occured");
        return res.status(400).send(respObject);
    }
    /**
     * Finding the user
     */
    try {
        let findUser = (yield Auth_model_1.default.findOne({ username: logtype })) ||
            (yield Auth_model_1.default.findOne({ email: logtype }));
        if (!findUser) {
            let responseObj = new Response_1.default(404, {}, {}, "Sorry, The user was not found. Please check again.");
            return res.status(404).send(responseObj);
        }
        //Checking if the account is activated
        if (findUser.status != "1") {
            let responsObj = new Response_1.default(405, findUser, {}, "Your account is not activated");
            return res.status(405).send(responsObj);
        }
        //Finally checking the password
        const isMatch = yield bcryptjs_1.default.compare(password, findUser.password);
        if (!isMatch) {
            let responsObj = new Response_1.default(401, {}, {}, "Sorry, Password did not matched. Please try again.");
            return res.status(401).send(responsObj);
        }
        let access_token = jsonwebtoken_1.default.sign({ user: { id: findUser._id } }, process.env.mySecret, { expiresIn: 3600000 });
        //Object for sending data to response
        let userData = {
            _id: findUser._id,
            email: findUser.email,
            username: findUser.username,
            status: findUser.status,
        };
        let resData = {
            access_token: access_token,
            user: userData,
        };
        let respObject = new Response_1.default(200, resData, {}, "Login Successfull");
        return res.status(200).send(respObject);
    }
    catch (error) {
        let errorObject = {};
        if (error instanceof Error)
            errorObject = error;
        let responseObj = new Response_1.default(500, errorObject, {}, "Server Error");
        return res.status(500).send(responseObj);
    }
});
exports.LoginTask = LoginTask;
