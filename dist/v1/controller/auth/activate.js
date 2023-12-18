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
const Auth_model_1 = __importDefault(require("../../model/Auth.model"));
const Response_1 = __importDefault(require("../Response"));
/**
 * The activate account task
 */
const ActivateAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
            let responseObj = new Response_1.default(404, {}, {}, "Sorry, The user was not found. Please check again and try.");
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
exports.default = ActivateAccount;
