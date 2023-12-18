"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A response class
 *  msg = the message of the response
 *  data = data object
 *  status = the response status
 */
class ResponseObj {
    constructor(status, data, meta, msg) {
        this.status = status;
        this.data = data;
        this.meta = meta;
        this.msg = msg;
    }
}
exports.default = ResponseObj;
