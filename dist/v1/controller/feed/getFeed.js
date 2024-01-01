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
const Feed_modal_1 = __importDefault(require("../../model/Feed.modal"));
const Response_1 = __importDefault(require("../Response"));
const respPagination_1 = __importDefault(require("../respPagination"));
/**
 * Get all feeds
 * @param req
 * @param res
 */
const getFeedTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const feeds = yield Feed_modal_1.default.find();
        if (Object(feeds).length === 0) {
            const paginate = new respPagination_1.default(0, 0, 0);
            const responseObj = new Response_1.default(200, {}, paginate, "No Data");
            return res.status(200).send(responseObj);
        }
        const paginate = new respPagination_1.default(0, 0, 0);
        const responseObj = new Response_1.default(200, feeds, paginate, "Data");
        return res.status(200).send(responseObj);
    }
    catch (error) {
        let errorObject = {};
        if (error instanceof Error)
            errorObject = error;
        let resData = new Response_1.default(500, errorObject, {}, "Something went wrong");
        return res.send(resData);
    }
});
exports.default = getFeedTask;
