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
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Auth_model_1 = __importDefault(require("../../model/Auth.model"));
const Response_1 = __importDefault(require("../Response"));
/**
 * The login task
 */
const LoginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { authType, password } = req.body;
    //Checking validations
    let errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        let respObject = new Response_1.default(400, errors, {}, "Validations error occurred");
        return res.status(400).send(respObject);
    }
    /**
     * Finding the user
     */
    try {
        let findUser = yield Auth_model_1.default.findOne({
            $or: [{ email: authType }, { username: authType }],
        });
        if (!findUser) {
            let responseObj = new Response_1.default(404, {}, {}, "Sorry, The user was not found. Please check again.");
            return res.status(404).send(responseObj);
        }
        //Checking if the account is activated
        if (findUser.status != "1") {
            let responseObj = new Response_1.default(405, findUser, {}, "Your account is not activated");
            return res.status(405).send(responseObj);
        }
        //Finally checking the password
        const isMatch = yield bcryptjs_1.default.compare(password, findUser.password);
        if (!isMatch) {
            let responseObj = new Response_1.default(401, {}, {}, "Sorry, Password did not matched. Please try again.");
            return res.status(401).send(responseObj);
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
        let respObject = new Response_1.default(200, resData, {}, "Login Success");
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
exports.default = LoginUser;
