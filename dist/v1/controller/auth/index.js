"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.ActivateAccount = exports.SendActivationMail = exports.RegisterUser = void 0;
const register_1 = __importDefault(require("./register"));
exports.RegisterUser = register_1.default;
const activationEmail_1 = __importDefault(require("./activationEmail"));
exports.SendActivationMail = activationEmail_1.default;
const activate_1 = __importDefault(require("./activate"));
exports.ActivateAccount = activate_1.default;
const login_1 = __importDefault(require("./login"));
exports.LoginUser = login_1.default;
