"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Class for pagination response
 * page : current page number
 * pageSize : total item in one page
 * totoalItem : total items
 */
class respPagination {
    constructor(page, pageSize, totalItem) {
        this.page = page;
        this.pageSize = pageSize;
        this.totalItem = totalItem;
    }
}
exports.default = respPagination;
